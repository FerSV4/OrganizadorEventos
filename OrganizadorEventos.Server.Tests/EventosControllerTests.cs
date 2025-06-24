using Xunit;
using Microsoft.AspNetCore.Mvc;
using OrganizadorEventos.Server.Controllers;
using OrganizadorEventos.Server.Models;
using OrganizadorEventos.Server.Services;
using System;

public class InstanciaEventoService : EventoService
{
    public override Evento? ObtenerEventoPorId(int id)
    {
        if (id == 969)
        {
            return null;
        }
        return new Evento { EventoId = id, Titulo = "ElnuevoTest", Lugar = "Ucb", Descripcion = "2025" };
    }
//Para evitar usar la base de datos real, creamos la respuesta falsa NULL
    public InstanciaEventoService() : base(null) { }
}

public class EventosControllerTests
{
    private readonly EventosController _controlador;
    private readonly EventoService _serviceEvento;

    public EventosControllerTests()
    {
        _serviceEvento = new InstanciaEventoService();
        _controlador = new EventosController(_serviceEvento);
    }

    [Fact]
    public void Prueba_para_evento_no_existente()
    {
        var idParaPrueba = 969;

        var resultado = _controlador.GetEvento(idParaPrueba);
    //La verificacion si no se encuentra el evento.
        Assert.IsType<NotFoundResult>(resultado.Result);
    }
}