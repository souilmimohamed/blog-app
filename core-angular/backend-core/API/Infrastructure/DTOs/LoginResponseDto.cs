﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs
{
    public class LoginResponseDto : UserDto
    {
        public string Token { get; set; }
    }
}
