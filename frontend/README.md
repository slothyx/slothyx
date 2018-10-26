## File Tree

```bash
├── public                # Folder with HTML template & favicon
│   ├── favicon.png       # Example favicon
│   └── index.html        # HTML template
├── src                   # Main folder with index.js & components
│   ├── components        # Subfolder with components
│   │   ├── container.js  # Example component 1
│   │   └── header.js     # Example component 2
│   └── index.js          # Main file
├── .npmrc                # npm config
├── .stylelintrc          # stylelint config
├── .travis.yml           # Travis CI config
├── package.json          # Package config with scripts, list of dependencies etc.
├── webpack.config.js     # Webpack config
├── babel.config.js       # Babel config
```

## Usage

```bash
# Install dependencies

 $ npm install

# Start webpack-dev-server with HMR at port 5000

 $ npm start

# Run linters

 $ npm test

# Build app for production

 $ npm run build
```

### License

MIT
