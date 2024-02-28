using Domain.Interfaces.Services;
using Domain.Models;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Service.Implements;
using System.Reflection;
using WebExampleTraining.ExceptionHandler;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();//Default Init Framework

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();//Default Init Framework
builder.Services.AddSwaggerGen();//Default Init Framework

var configSPAStaticFile = false;
if (configSPAStaticFile)
{
    builder.Services.AddSpaStaticFiles(configuration =>
    {
        configuration.RootPath = "wwwroot";
    });
}

var configCOR = true;
if (configCOR)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
            builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
    });
}

//Dependency Register
builder.Services.AddDbContext<ExamsContext>(options =>
{
    options
    //.UseLazyLoadingProxies()
    .UseSqlServer(builder.Configuration.GetConnectionString("ExamsDatabase"));
});
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
//builder.Services.AddScoped<IOrderService, OrderService>();
var reflectSuffixDependencyInject = true;
if (reflectSuffixDependencyInject) {
    var interfaceAssembly = Assembly.GetAssembly(typeof(ICustomerService)).GetTypes().Where(x => x.Name.EndsWith("Service"));
    var assembly = Assembly.GetAssembly(typeof(CustomerService)).GetTypes().Where(x => x.Name.EndsWith("Service"));
    foreach (var @interface in interfaceAssembly)
    {
        var implement = assembly.FirstOrDefault(c => c.IsClass && @interface.Name.Substring(1) == c.Name);
        if (implement != null)
            builder.Services.AddScoped(@interface, implement);
    }
}



var app = builder.Build();//Default Init Framework

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();//Default Init Framework
    app.UseSwaggerUI();//Default Init Framework
    //Angular Development Env. Integrate
    if (configCOR)
    {
        app.UseCors("CorsPolicy");
    }
}
else
{
    //Default Static File
    app.UseDefaultFiles();
    app.UseStaticFiles();
    //For Production Angular SPA
    if (configSPAStaticFile)
    {
        app.UseSpaStaticFiles();
        app.UseSpa(spa =>
        {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501
            spa.Options.SourcePath = "wwwroot";
        });
    }
}

app.UseHttpsRedirection();//Default Init Framework
app.UseAuthorization();//Default Init Framework
app.MapControllers();//Default Init Framework


app.UseCustomExceptionHandler();

app.Run();//Default Init Framework
