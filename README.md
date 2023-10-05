# Prueba técnica - Estudio Faser

## Rama Fixes

Esta rama fue creada porque no me gusto la forma en la que hice el punto 5, por lo que lo cambie y lo hice de una forma
más sencilla y que se ve mejor.
Esta rama es por puro gusto personal, ya la rama master cumple con todos los requerimientos, aparte de que fue hecha
después del tiempo establecido, por lo que no espero que la tomen en cuenta.
De cualquier manera, si ven esta rama, pueden darle un vistazo y ver como lo hice.

**Cambios Hechos**:

1. Introducción de la Interfaz ColumnHeader, para poder hacer el ordenamiento de manera más sencilla y dejar de trabajar
   con el DOM.
2. Creación del Servicio TableSortingService, para poder separar esa funcionalidad de la tabla. y poder
   reutilizarla en otras tablas.
3. Introducción del Botón Toggle Destacar, básicamente en las tareas que están seleccionadas, se le destaca y se les
   quita cuando se vuelve a presionar el botón.
4. Seleccionar todo ahora también funciona como un toggle cuando todas las tareas están seleccionadas.
5. arregle bug de UI, de flechita hacia arriba y hacia abajo.

## Instalación

1. Hacer un fork de este repositorio en su cuenta de Github, que sea público.
2. Clonar su fork en su equipo local.
3. Ingresar vía Terminal o Command Prompt a la carpeta del proyecto y correr `npm install` para descargar las
   dependencias.
4. Correr el servidor local con `ng serve`.
5. Ingresar a `http://localhost:4200` para ver el sitio de pruebas.

## Requerimientos

En este repositorio encontrarás un proyecto base Angular con elementos muy básicos. Dentro de `AppComponent` se
encuentra una variable que contiene un listado de tareas. Debes realizar las modificaciones necesarias para obtener los
siguientes resultados:

1. Cambiar el listado ordenado por una tabla HTML.
2. Agregar la opción para poder agregar nuevas tareas al listado, cada una con su título y duración en minutos.
3. Agregar un control que permita seleccionar una o varias tareas a la vez.
4. Agregar un botón para eliminar la o las tareas seleccionadas.
5. Agregar la opción de poder ordenar de manera ascendente o descendente la tabla al tocar los distintos encabezados de
   la misma.
6. Agregar un botón para marcar las tareas seleccionadas como destacadas. Las tareas destacadas deben tener un estilo
   que las distinga de las tareas normales.
7. Agregar un botón que permita ordenar todas las tareas de manera aleatoria.

## Observaciones

- Se calificará que se cumplan los requerimientos solicitados.
- Realizar un commit por cada punto completado, identificándolo claramente con el número del punto realizado.
- Se favorecerá al código legible, comentado y que siga buenas prácticas de programación.
- Concentrarse únicamente en el cumplimiento de los requerimientos. Se ignorará el aspecto gráfico de la aplicación.
- Cualquier duda sobre los requerimientos o la entrega comunicarla vía WhatsApp.
