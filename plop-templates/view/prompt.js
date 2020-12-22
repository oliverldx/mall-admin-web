const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    },
    {
      name: 'apijs',
      value: 'apijs',
      checked: true
    },
    {
      name: 'apitmpdata',
      value: 'apitmpdata',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]
    let genApiJs = data.blocks.includes('apijs')
    if(genApiJs) {
      let name1 = '{{name}}'
      actions.push({
        type: 'add',
        path: `src/api/${name1}.js`,
        templateFile: 'plop-templates/view/api.hbs',
        data: {
          name: name1,
          apijs: data.blocks.includes('apijs'),
          apitmpdata: data.blocks.includes('apitmpdata')
        }
      })
    }

    return actions
  }
}
