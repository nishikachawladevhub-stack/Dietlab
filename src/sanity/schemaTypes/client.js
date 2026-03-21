export default {
    name: 'client',
    title: 'Clients',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Client Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'goal',
        title: 'Diet Goal',
        type: 'string'
      
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'date',
      },
      {
        name: 'notes',
        title: 'Client Notes',
        type: 'text',
      },
    ],
  }