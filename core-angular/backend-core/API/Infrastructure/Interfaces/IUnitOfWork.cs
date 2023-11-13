using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IProfileImageRepository ProfileImageRepository { get; }
        IBlogRepository BlogRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
