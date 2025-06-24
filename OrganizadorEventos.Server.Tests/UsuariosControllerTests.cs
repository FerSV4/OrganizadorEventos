using Xunit;
using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System.Collections.Generic;
using System.Linq;

// --- Creamos un "Doble de Acción" para el UsuarioService ---
public class UsuarioServiceMock : UsuarioService
{
    // Para que esto funcione, el método en tu UsuarioService real
    // debe estar marcado como "virtual".
    // Ejemplo: public virtual IEnumerable<Evento> ObtenerInscripcionesDeUsuario(int usuarioId)
    public override IEnumerable<Evento> ObtenerInscripcionesDeUsuario(int usuarioId)
    {
        // Simulamos el comportamiento: si nos piden las inscripciones del usuario con ID=1...
        if (usuarioId == 1)
        {
            // ...devolvemos una lista que contiene un solo evento de prueba.
            var eventoDePrueba = new Evento { EventoId = 101, Titulo = "Evento de A", CreadorId = 1 };
            return new List<Evento> { eventoDePrueba };
        }

        // Para cualquier otro usuario, devolvemos una lista vacía.
        return new List<Evento>();
    }

    // El constructor base necesita un DbContext, pero como no lo usaremos, pasamos null.
    public UsuarioServiceMock() : base(null) { }
}


public class UsuariosControllerTests
{
    private readonly UsuariosController _controlador;
    private readonly UsuarioService _servicioFalso;

    public UsuariosControllerTests()
    {
        // Creamos una instancia de nuestro servicio falso
        _servicioFalso = new UsuarioServiceMock();
        // Le pasamos el servicio falso al controlador
        _controlador = new UsuariosController(_servicioFalso);
    }

    [Fact]
    public void GetInscripcionesUsuario_DebeRetornarSoloLosEventosDelUsuario()
    {
        // Arrange
        // Ya no necesitamos crear usuarios ni eventos aquí, porque el mock se encarga de todo.
        var idUsuarioParaProbar = 1;

        // Act
        // Llamamos al método del controlador
        var actionResult = _controlador.GetInscripcionesUsuario(idUsuarioParaProbar);

        // Assert
        // Verificamos que la respuesta del controlador sea la que programamos en el mock.
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var eventosDevueltos = Assert.IsAssignableFrom<IEnumerable<Evento>>(okResult.Value);
        
        // Afirmamos que la lista contiene exactamente UN evento (como definimos en el mock).
        Assert.Single(eventosDevueltos);
        // Afirmamos que el evento es el correcto.
        Assert.Equal(101, eventosDevueltos.First().EventoId);
    }
}