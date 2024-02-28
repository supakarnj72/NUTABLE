using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Errors
{
    public class CustomError : Exception, IDisposable
    {
        public List<string> ErrorMessage { get; set; } = new List<string>();
        public CustomError()
        {
        }

        public CustomError(string message) : base(message)
        {
            ErrorMessage.Add(message);
        }

        public void ThrowIfError()
        {
            if (ErrorMessage.Count == 0) return;
            if (!string.IsNullOrWhiteSpace(string.Join("", ErrorMessage)))
                throw this;
        }

        public void Dispose()
        {
            ThrowIfError();
        }

        public void AddError(string message)
        {
            ErrorMessage.Add(message);
        }
    }
}
