import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import playwright from "playwright";

dayjs.extend(utcPlugin);

async function main() {
  const browser = await playwright.chromium.launch();

  const page = await browser.newPage();
  await page.goto("https://cms.sgi-usa.org/tmf/");
  const quote = await page.$eval(".post-content2", (postContent) => {
    const paragraphs = postContent.querySelectorAll("p");
    return Array.from(paragraphs)
      .map((p) => p.textContent?.trim())
      .slice(1)
      .join(" ");
  });

  const data = {
    date: dayjs.utc().format(),
    quote,
  };

  console.log(data);

  await browser.close();
}

main();
