Enlace gemini: https://share.gemini.google/vjxllr5Hyd1D

Conversacion antigravity:
1.
Actúa como un desarrollador Full-Stack experto en Next.js (App Router), TypeScript y Tailwind CSS. Tu objetivo es reconstruir una aplicación web de gestión de contactos migrando la estructura de un proyecto Symfony existente.

Crea el proyecto paso a paso implementando la siguiente arquitectura:

1. Base de Datos (ORM como Prisma o Drizzle):

    Crea el esquema para la entidad User (gestión de autenticación).

    Crea el esquema para la entidad Contacto (información del directorio).

    Crea el esquema para la entidad Provincia (relacionada en formato 1:N con los contactos).

2. Sistema de Rutas (App Router):

    / (Inicio): Listado de todos los contactos.

    /nuevo: Formulario para añadir un nuevo contacto.

    /contacto/[id]: Vista de detalle (ficha) de un contacto específico.

    /contacto/[id]/editar: Formulario para actualizar la información.

    /login y /register: Flujo completo de autenticación de usuarios.

3. Componentes y Diseño UI:

    Genera un RootLayout global que contenga la barra de navegación principal.

    Crea un componente reutilizable <ContactCard/> para mostrar la información resumida de cada contacto en la cuadrícula del listado.

    Utiliza Tailwind CSS para replicar un diseño limpio, responsivo y moderno basado en formularios de tarjeta.

4. Lógica de Servidor y Seguridad:

    Implementa Server Actions en TypeScript para gestionar de forma segura todas las operaciones CRUD (Crear, Leer, Actualizar, Borrar) de los contactos y provincias.

    Protege las rutas de creación y edición para que solo los usuarios autenticados puedan modificar la base de datos.

Por favor, comienza generando únicamente la configuración del ORM y los esquemas de las tablas. Una vez que confirme que son correctos, procederemos con la creación de los componentes de la interfaz y las acciones de servidor.

2.
Actúa como un desarrollador Full-Stack experto en Next.js (App Router), TypeScript, Tailwind CSS y Prisma (u otro ORM moderno). Necesito que construyas una aplicación web de gestión de contactos con sistema de autenticación y operaciones CRUD completas en una sola página.

Sigue estas especificaciones técnicas y de diseño paso a paso:

1. Base de Datos (Esquema):

    Modelo User: Para gestionar la autenticación (email, contraseña, etc.).

    Modelo Contact: Debe estar relacionado con el usuario creador e incluir exactamente 4 campos:

        nombre (String)

        email (String)

        numero (String)

        provincia (Enum o String validado) que solo acepte tres opciones: "Murcia", "Castellón" y "Valencia".

2. Autenticación y Estado de Sesión:

    Implementa un sistema de autenticación (puedes usar NextAuth/Auth.js o sesiones por cookies).

    En el diseño principal (Header o barra de navegación), coloca dos botones visibles si el usuario no ha iniciado sesión: "Iniciar Sesión" y "Registrarse".

    Si el usuario ya ha iniciado sesión, oculta esos botones y muestra un botón de "Cerrar Sesión" junto con un botón para "Crear nuevo contacto".

3. Interfaz Principal (Página de Inicio - /):

    Vista Pública (Sin sesión): Si el usuario no está logueado, muestra la barra de navegación y un mensaje invitándole a iniciar sesión o registrarse para gestionar sus contactos. Opcionalmente, puedes mostrar una lista de contactos públicos si así lo diseñas, pero la edición debe estar bloqueada.

    Vista Privada (Con sesión):

        Muestra el listado de los contactos creados por el usuario en formato cuadrícula (Grid) o lista de tarjetas (Cards).

        Cada tarjeta de contacto debe mostrar sus 4 datos (Nombre, Email, Número y Provincia).

        Acciones en la tarjeta: Cada contacto debe tener en su misma tarjeta dos botones pequeños: "Editar" y "Borrar".

4. Lógica de Formularios y Server Actions:

    Crear: Al pulsar "Crear nuevo contacto", muestra un formulario (puede ser un Modal o expandirse en la pantalla) con los campos requeridos y un <select> para la provincia.

    Editar: Al pulsar "Editar" en un contacto, el formulario debe rellenarse automáticamente con sus datos actuales para poder modificarlos y guardarlos sin cambiar de página.

    Borrar: Al pulsar "Borrar", debe eliminar el contacto de la base de datos (puedes añadir un cuadro de confirmación nativo).

    Utiliza Server Actions de Next.js para gestionar las operaciones de base de datos de forma rápida y segura sin necesidad de crear una API externa.

Por favor, comienza generando el esquema de la base de datos y la configuración del sistema de autenticación. Cuando esté listo, procederemos con los componentes de la interfaz de la página de inicio.

3.
He obtenido el error "Foreign key constraint violated" al intentar crear un contacto en src/app/actions/contactActions.ts. Este error ocurre porque no le estoy pasando el userId obligatorio a prisma.contact.create().

4.
Actúa como un desarrollador Full-Stack experto en Next.js (App Router), TypeScript, Tailwind CSS y Prisma (u otro ORM moderno). Necesito que me añadas otra vez el boton de modificar/borrar para poder modificar y borrar los contactos.Y haz que pueda modificarlo y borrarlo cualquier persona que inicie sesión.
