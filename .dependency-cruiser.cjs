/** Import boundaries. Add a `forbidden` rule each time /correct finds a cross-layer import. */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular import. Move the shared code into a module both sides import.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment: 'Production code imports a devDependency. Move it to dependencies or keep it in test code.',
      from: { path: '^(app|components|lib)', pathNot: '\\.(test|spec)\\.[jt]sx?$' },
      to: { dependencyTypes: ['npm-dev'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
  },
};
