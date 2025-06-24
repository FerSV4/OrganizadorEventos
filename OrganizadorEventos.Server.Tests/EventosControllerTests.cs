// Archivo: OrganizadorEventos.Server.Tests/EventosControllerTests.cs

using Xunit;
using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System;

// --- Este es el "Doble de Acción" ---
public class EventoServiceMock : EventoService
{
    // Sobrescribimos el método gracias a que el original es 'virtual'
    public override Evento? ObtenerEventoPorId(int id)
    {
        if (id == 969)
        {
            return null; // Simulamos que no se encontró
        }
        return new Evento { EventoId = id, Titulo = "Evento de Prueba", Lugar = "Lugar", Descripcion = "Desc" };
    }

    // El constructor base necesita un DbContext, pero como no lo usaremos, pasamos null.
    public EventoServiceMock() : base(null) { }
}

// --- Esta es la Prueba ---
public class EventosControllerTests
{
    private readonly EventosController _controlador;
    private readonly EventoService _servicioFalso;

    public EventosControllerTests()
    {
        _servicioFalso = new EventoServiceMock();
        _controlador = new EventosController(_servicioFalso);
    }

    [Fact]
    public void Test_Evento_ID_No_existente()
    {
        // Arrange
        var idParaPrueba = 969;

        // Act
        var resultado = _controlador.GetEvento(idParaPrueba);

        // Assert
        Assert.IsType<NotFoundResult>(resultado.Result);
    }
}