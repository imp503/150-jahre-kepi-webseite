import path from "node:path";
import * as sass from "sass";

export default async function (eleventyConfig) {
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        useLayouts: false,
        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            if (parsed.name.startsWith("_")) {
                return;
            }

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes,
                ]
            });

            this.addDependencies(inputPath, result.loadedUrls);

            return async (data) => {
                return result.css;
            };
        },
    });

    eleventyConfig.setOutputDirectory("site");
    eleventyConfig.setInputDirectory("articles");
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addPassthroughCopy("articles/static/fonts");
    eleventyConfig.addPassthroughCopy("articles/static/media/**/*.jpg");
}