import path from "node:path";
import * as sass from "sass";
import build from "./obfuscate.js";

export default async function (eleventyConfig) {
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        useLayouts: false,
        compile: async function (inputContent, inputPath) {
            const parsed = path.parse(inputPath);
            if (parsed.name.startsWith("_")) {
                return;
            }

            const result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes,
                ]
            });

            this.addDependencies(inputPath, result.loadedUrls);

            return async (_) => {
                return result.css;
            };
        },
    });

    eleventyConfig.setOutputDirectory("site");
    eleventyConfig.setInputDirectory("articles");
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addPassthroughCopy("articles/robots.txt");
    eleventyConfig.addPassthroughCopy("articles/static/fonts");
    eleventyConfig.addPassthroughCopy("articles/static/media/**/*.jpg");
    eleventyConfig.addPassthroughCopy("articles/static/media/**/*.svg");
    eleventyConfig.addPassthroughCopy("articles/static/media/audio/*.mp3");

    eleventyConfig.on("eleventy.after", async ({ _directories, _results, _runMode, _outputMode }) => await build());
}