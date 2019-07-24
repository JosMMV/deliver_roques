'use strict'

const Database = use('Database');
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ordendistribucions
 */
class OrdenDistribucionController {
  /**
   * Show a list of all ordendistribucions.
   * GET ordendistribucions
   */
  async index () {
    return await Database.select('*').from('ordenes_distribucion');
  }

  /**
   * Render a form to be used for creating a new ordendistribucion.
   * GET ordendistribucions/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const d = new Date();
    const { cliente, rifComercio, nombreSucursal, productos } = request.all();
    const sucursal = await Database.from('sucursales').where('nombre', nombreSucursal);
    const clienteA = await Database.from('clientes').where('cedula', cliente.cedula);
    clienteA.length === 0 ? await Database.insert({
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      created_at: d,
      updated_at: d
    }).into('clientes') : null;
    const costo = await this.calcularCosto(productos, sucursal[0].distanciaDesdeCaracas);
    const fechaEstimada = this.calcularTiempoEnvio(sucursal[0].distancia);
    const orden = await Database.insert({
      id: parseInt(d.getTime().toString().substr(4)),
      costoEnvio: costo,
      tiempoEnvio: fechaEstimada,
      confirmada: false,
      cedula_cliente: cliente.cedula,
      comercio_rif: rifComercio,
      surcursal_id: sucursal[0].id,
      created_at: d,
      updated_at: d
    }).into('ordenes_distribucion');
    await this.insertarProductoPerteneceOrden(productos, orden[0]);
    return {
      'nroOrden': orden[0],
      'tiempoEnvio': fechaEstimada,
      'costoEnvio': costo,
    };
  }

  async confirm ({ params }) {
    const ordenDistribucion = await Database.table('ordenes_distribucion').where('id', params.id).update('confirmada', true);
    ServicioValidacion.verificarOrden(ordenDistribucion);
    return !!ordenDistribucion; 
  }

  /**
   * Display a single ordendistribucion.
   * GET ordendistribucions/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const ordenDistribucion = await Database.from('ordenes_distribucion').where('id', params.id);
    ServicioValidacion.verificarOrden(ordenDistribucion);
    return ordenDistribucion;
  }

  /**
   * Display a single ordendistribucion.
   * GET ordendistribucions/:id
   *
   * @param {object} ctx
   */
  async showByShop ({ params }) {
    const ordenDistribucion = await Database.from('ordenes_distribucion').where('comercio_rif', params.rif);
    ServicioValidacion.verificarOrden(ordenDistribucion);
    return ordenDistribucion;
  }

  /**
   * Update ordendistribucion details.
   * PUT or PATCH ordendistribucions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    let ordenDistribucion;
    const { tipo, fecha } = request.all();
    switch (tipo) {
      case "empacado":
        ordenDistribucion = await Database.table('ordenes_distribucion').where('id', params.id).update({
          empacado: fecha,
          updated_at: new Date(),
        });
        break;
      case "cargado":
        ordenDistribucion = await Database.table('ordenes_distribucion').where('id', params.id).update({
          cargado: fecha,
          updated_at: new Date(),
        });
        break;
      case "camino":
        ordenDistribucion = await Database.table('ordenes_distribucion').where('id', params.id).update({
          camino: fecha,
          updated_at: new Date(),
        });
        break;
      case "sucursal":
        ordenDistribucion = await Database.table('ordenes_distribucion').where('id', params.id).update({
          sucursal: fecha,
          updated_at: new Date(),
        });
        break;
      default:
        ordenDistribucion = {
          'message': 'error',
        }
        break;
    }
    return ordenDistribucion;
  }

  /**
   * Delete a ordendistribucion with id.
   * DELETE ordendistribucions/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    return {
      message: 'Nada por ahora. Luego se eliminará ' + params.id,
    }
  }

  async calcularCosto(productos, distancia) {
    // let precioTotal = 0;
    let volumenTotal = 0;
    let costoEnvio = 0;
    for (let index = 0; index < productos.length; index++) {
      const producto = await Database.from('productos').where('id', productos[index].id);
      ServicioValidacion.verificarProducto(producto);
      //precioTotal += producto[0].precio*productos[index].cantidad;
      volumenTotal += producto[0].volumen*productos[index].cantidad;
    }
    costoEnvio = volumenTotal*distancia*0.005;
    /*if (precioTotal > 200000) {
      costoEnvio *= 0.7;
    }*/
    return costoEnvio;
  }
  
  calcularTiempoEnvio(distancia) {
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    let current_datetime = new Date();
    if (distancia === 458) {
      current_datetime = current_datetime.addDays(5);
    } else {
      if (distancia < 100) {
        current_datetime = current_datetime.addDays(1);
      } else {
        if (distancia < 400) {
          current_datetime = current_datetime.addDays(2);
        } else {
          current_datetime = current_datetime.addDays(3);
        }
      }
    }
    /*let fecha = [current_datetime.getDate().toString(), (current_datetime.getMonth() + 1).toString(), current_datetime.getFullYear().toString()]
    fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
    let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];*/
    return current_datetime;
  }

  async insertarProductoPerteneceOrden(productos, orden) {
    const d = new Date();
    let success = true;
    for (let index = 0; index < productos.length; index++) {
      success &= await Database.insert({
        orden_id: orden,
        producto_id: productos[index].id,
        cantidad: productos[index].cantidad,
        created_at: d,
        updated_at: d,
      }).into('productos_pertenece_orden');
    }
    return success;
  }
}

module.exports = OrdenDistribucionController
