.PHONY: all clean minified compiled clean-modules clean-all

NPM_BIN = $(shell npm bin)
WEBPACK ?= $(NPM_BIN)/webpack
OUTPUT_DIR ?= $(PWD)/extension

MANIFEST_SRC = $(PWD)/manifest.json
MANIFEST = $(OUTPUT_DIR)/manifest.json

BUNDLE_SRC = $(PWD)/main.jsx
BUNDLE = $(OUTPUT_DIR)/bundle.js

all: $(MANIFEST) $(BUNDLE)

$(MANIFEST): $(MANIFEST_SRC) | $(OUTPUT_DIR)
	cp $(MANIFEST_SRC) $(MANIFEST)

$(BUNDLE): $(BUNDLE_SRC) node_modules | $(OUTPUT_DIR)
	$(WEBPACK) --progress --output-path $(OUTPUT_DIR)

$(OUTPUT_DIR):
	mkdir $(OUTPUT_DIR)

node_modules: package.json
	npm install
	touch -ma node_modules

clean:
	rm -rf $(OUTPUT_DIR)

clean-modules:
	rm -rf node_modules package-lock.json

clean-all: clean clean-modules
