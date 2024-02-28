using Domain.Errors;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;
using System.Runtime.InteropServices;

namespace WebExampleTraining.ExceptionHandler
{
    public static class ExceptionHandler
    {
        public static void UseCustomExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    if (context.Features.Get<IExceptionHandlerFeature>() != null)
                    {
                        var exception = context.Features.Get<IExceptionHandlerFeature>().Error;
                        context.Response.ContentType = "application/json";
                        var jsonSerializerSettings = new JsonSerializerSettings
                        {
                            ContractResolver = new CamelCasePropertyNamesContractResolver()
                        };
                        if ((exception as CustomError) != null)
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                            await context.Response.WriteAsync(JsonConvert.SerializeObject(exception, jsonSerializerSettings));
                        }
                        else
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            var msg = exception.InnerException?.Message ?? exception.Message;
                            //save error log
                            var errorCode = Guid.NewGuid();
                            string message = $"ErrorCode : {errorCode}\n {msg}";
                            await context.Response.WriteAsync(JsonConvert.SerializeObject(
                                new CustomError(message), jsonSerializerSettings));
                        }
                    }
                });
            });
        }
    }
}
