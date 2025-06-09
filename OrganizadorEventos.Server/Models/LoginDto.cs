namespace OrganizadorEventos.Server.Models;
    
using System.ComponentModel.DataAnnotations;
    
public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Correo { get; set; }
    
    [Required]
    public string Password { get; set; }
}