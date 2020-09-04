var request = require('request')
const controller = {}
const fs = require('fs')

// carga de index y renderización de pagina principal
controller.index = function (req, res) {
  // Index simple para saludar a los usuarios
  console.log('Bienvenido a Index')
}

controller.make_pedido = function (req, res) {
  request({
    url: 'http://localhost:3001/pedido',
    method: 'GET'
  }, function (error, response1) {
    // res is the response object, and it passes info back to client side
    if (error) {
      throw (error)
    } else {
      request({
        url: 'http://localhost:3002/pedido',
        method: 'POST',
        body: JSON.parse(response1.body),
        json: true
      }, function (error, response2) {
        // res is the response object, and it passes info back to client side
        if (error) {
          throw (error)
        } else {
          var mensaje = 'Cliente: Orden realizada con exito\n'
          console.log(mensaje)
          fs.appendFile('./log.txt', mensaje, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err
            // success case, the file was saved
            console.log('Escribi en archivo')
          })
          res.send('Success')
        }
      })
    }
  })
}

controller.verify_res = function (req, res) {
  request({
    url: 'http://localhost:3001/estado_res',
    method: 'GET'
  }, function (error, response1) {
    // res is the response object, and it passes info back to client side
    if (error) {
      throw (error)
    } else {
      request({
        url: 'http://localhost:3002/estado_ped',
        method: 'GET',
        body: JSON.parse(response1.body),
        json: true
      }, function (error, response) {
        // res is the response object, and it passes info back to client side
        if (error) {
          throw (error)
        } else {
          var wrt = 'Cliente: Su pedido esta siendo preparado\n'
          fs.appendFile('./log.txt', wrt, (err) => {
            if (err) throw err
            console.log('Escribi en archivo')
          })
          res.send('Success')
        }
      })
    }
  })
}

controller.verify_rep = function (req, res) {
  request({
    url: 'http://localhost:3001/estado_rep',
    method: 'GET'
  }, function (error, response1) {
    // res is the response object, and it passes info back to client side
    if (error) {
      throw (error)
    } else {
      request({
        url: 'http://localhost:3003/estado_ped',
        method: 'GET',
        body: JSON.parse(response1.body),
        json: true
      }, function (error, response) {
        // res is the response object, and it passes info back to client side
        if (error) {
          throw (error)
        } else {
          var wrt = 'Cliente: Su pedido se encuentra en camino\n'
          fs.appendFile('./log.txt', wrt, (err) => {
            if (err) throw err
          })
          res.send('Success')
        }
      })
    }
  })
}

controller.set_ready = function (req, res) {
  // res.render('home', { message: message })
  console.log('Index')
}

controller.set_delivered = function (req, res) {
  // res.render('home', { message: message })
  console.log('Index')
}

module.exports = controller
