using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public interface Ihandle<TData, TResponse>
    {
        Task<TResponse> HandleAsync();
        Task<TResponse> ValidateAsync();
    }
}
