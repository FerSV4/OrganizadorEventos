namespace OrganizadorEventos.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using Xunit;

public class AuthControllerTests
{
    private OrganizadorEventosContext _contexto;
    private AuthController _controlador;

    public AuthControllerTests()
    {
        var opciones = new DbContextOptionsBuilder<OrganizadorEventosContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _contexto = new OrganizadorEventosContext(opciones);
        _controlador = new AuthController(_contexto);
    }

    [Fact]
    public async Task Login_ConCredencialesValidas_DebeDevolverUsuario()
    {

        var usuarioDePrueba = new Usuario
        {
            UsuarioId = 1, Correo = "pruebaunitaria@ucb.com", Password = "ucb123", NombreUsuario = "laucb", NombreCompleto = "Hola", FechaNacimiento = DateTime.Now
        };
        _contexto.Usuarios.Add(usuarioDePrueba);
        await _contexto.SaveChangesAsync();
        var datosLogin = new LoginDto { Correo = "pruebaunitaria@ucb.com", Password = "ucb123" };

        var resultado = await _controlador.Login(datosLogin);

        var ResultadoExito = Assert.IsType<OkObjectResult>(resultado.Result);
        var usuarioDevuelto = Assert.IsType<Usuario>(ResultadoExito.Value);
        Assert.Equal("pruebaunitaria@ucb.com", usuarioDevuelto.Correo);
    }


    [Fact]
    public async Task Test_Credenciales_Incorrectas()
    {
        var usuarioDePrueba = new Usuario
        {
            UsuarioId = 1, Correo = "test@ucb.com", Password = "password123", NombreUsuario = "usuariopruebafalsa", NombreCompleto = "Hola", FechaNacimiento = DateTime.Now
        };
        _contexto.Usuarios.Add(usuarioDePrueba);
        await _contexto.SaveChangesAsync();
        var DatosFalsosTest = new LoginDto { Correo = "test@mala.com", Password = "contraseñatestmal" };

        var resultado = await _controlador.Login(DatosFalsosTest);

        Assert.IsType<UnauthorizedObjectResult>(resultado.Result);
    }
}