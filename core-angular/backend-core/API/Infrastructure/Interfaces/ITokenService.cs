using Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
        Task<User> getLoggedInUser(int id);
    }
}
