namespace OrganizadorEventos.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using Xunit;

public class EventosControllerTests
{
    private OrganizadorEventosContext _contexto;
    private EventosController _controlador;

    public EventosControllerTests()
    {
        var opciones = new DbContextOptionsBuilder<OrganizadorEventosContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        _contexto = new OrganizadorEventosContext(opciones);

        var usuariosController = new UsuariosController(_contexto);
        _controlador = new EventosController(_contexto);
    }

    [Fact]
    public async Task Test_Evento_ID_No_existente()
    {
        var IdParaPrueba = 969;

        var resultado = await _controlador.GetEvento(IdParaPrueba);

        Assert.IsType<NotFoundResult>(resultado.Result);
    }
}