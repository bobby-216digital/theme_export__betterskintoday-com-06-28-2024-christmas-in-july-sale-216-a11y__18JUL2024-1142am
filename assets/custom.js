function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout)
      timer = setTimeout(() => {
        observer.disconnect();
        reject();
      }, timeout);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  waitForElement(".yotpo-sr-bottom-line-text", 5000)
    .then(() => {
      if (
        document.querySelector(".yotpo-sr-bottom-line-text").innerText ==
        "0 Reviews"
      ) {
        document.querySelector(
          ".yotpo-reviews-star-ratings-widget"
        ).style.display = "none";
      }
    })
    .catch((e) => {
      console.error(e.message);
    });

  waitForElement(".easytabs-header-text", 5000).then(() => {
    document.querySelectorAll(".easytabs-header-text").forEach((header) => {
      if (header.innerText == "Return Policy") {
        header.innerText = "Shipping & Returns";
      }
    });
  });
});
