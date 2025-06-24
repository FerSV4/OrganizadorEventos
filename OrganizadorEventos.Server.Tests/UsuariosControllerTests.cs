using Xunit;
using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System.Collections.Generic;
using System.Linq;

public class InstanciaUsuarioService : UsuarioService
{

    public override IEnumerable<Evento> ObtenerInscripcionesDeUsuario(int usuarioId)
    {
        if (usuarioId == 1)
        {
            var EventoManual = new Evento { EventoId = 101, Titulo = "Evento x", CreadorId = 1 };
            return new List<Evento> { EventoManual };
        }

        // Si no se busca el id 1 se retorna lista vacia
        return new List<Evento>();
    }
    //Nuevamente creamos una respuesta falsa para no usar la base de datos real
    public InstanciaUsuarioService() : base(null) { }
}


public class UsuariosControllerTests
{
    private readonly UsuariosController _controlador;
    private readonly UsuarioService _ServicioUsuario;

    public UsuariosControllerTests()
    {
        _ServicioUsuario = new InstanciaUsuarioService();
        _controlador = new UsuariosController(_ServicioUsuario);
    }

    [Fact]
    public void GET_de_eventos_de_un_usuario()
    {
        var id_del_usuario = 1;

        var actionResult = _controlador.GetInscripcionesUsuario(id_del_usuario);
        //Metodos sobre controller
        var Res_correcto = Assert.IsType<OkObjectResult>(actionResult.Result);
        var Eventos_obtenidos = Assert.IsAssignableFrom<IEnumerable<Evento>>(Res_correcto.Value);
        
        //Aqui se verifica que solo exista el evento manualmente creado.
        Assert.Single(Eventos_obtenidos);
        Assert.Equal(101, Eventos_obtenidos.First().EventoId);
    }
}