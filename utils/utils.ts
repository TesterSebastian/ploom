import { expect } from "@playwright/test";

class Utils {
  static async validateLinksAndImages(page) {
    const links = await page.$$eval("a", (anchors) =>
      anchors.map((anchor) => anchor.href),
    );
    const images = await page.$$eval("img", (imgs) =>
      imgs.map((img) => img.src),
    );

    const results = await Promise.allSettled([
      ...links.map(async (link) => {
        if (link.startsWith("http://") || link.startsWith("https://")) {
          const response = await page.request.fetch(link, { method: "HEAD" });
          expect(response.status(), `Broken link: ${link}`).toBeLessThan(400);
        } else if (link.startsWith("tel:")) {
          console.log(`Skipped tel link: ${link}`);
        } else {
          console.warn(`Unknown link protocol: ${link}`);
        }
      }),
      ...images.map(async (src) => {
        const response = await page.request.fetch(src, { method: "HEAD" });
        expect(response.status(), `Broken image: ${src}`).toBeLessThan(400);
      }),
    ]);

    return results;
  }

  static handleFailedResults(results) {
    const failedResults = results.filter(
      (result) => result.status === "rejected",
    );
    if (failedResults.length > 0) {
      const errors = failedResults.map((result) => result.reason);
      throw new Error(
        `Test failed due to broken links or images:\n${errors.join("\n")}`,
      );
    }
  }
}

export default Utils;
