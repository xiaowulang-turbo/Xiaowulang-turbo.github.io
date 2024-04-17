"use strict";
import { $, AJAX } from "./helpers.js";
import { ITEMS_PER_PAGE, TIMEOUT_SEC } from "./config.js";

const areaList = $(".area-list");
const versionList = $(".version-list");
const detailTitleTag = $(".detail-title--tag");
const detailList = $(".detail-list");
const detailPagination = $(".detail-pagination");

const tagItemP = document.querySelectorAll(".tag-item--p");
const areaAll = $(".area-All");
const areaHongTai = $(".area-HongTai");
const areaMainland = $(".area-Mainland");
const areaEurAme = $(".area-EurAme");
const areaKorea = $(".area-Korea");
const areaJapan = $(".area-Japan");
const versionAll = $(".version-All");
const versionMv = $(".version-Mv");
const versionScene = $(".version-Scene");
const versionCover = $(".version-Cover");
const versionFilm = $(".version-Film");
const versionDance = $(".version-Dance");
const versionVariety = $(".version-Variety");
const versionNursery = $(".version-Nursery");
const detailTypeNew = $(".detail-type--new");
const detailTypeHot = $(".detail-type--hot");

let pageSum = 0;
let currentPage = 1;
let start = (currentPage - 1) * ITEMS_PER_PAGE + 1,
  end = currentPage * ITEMS_PER_PAGE + 1;
let emptyMessage = "没有找到相关MV";

let path = `./data/new.json`;
let area = [0, "全部MV"];
let version = [0, "全部MV"];
let areaActive = areaAll;
let versionActive = versionAll;

// 区域字典
const areas = new Map([
  [areaAll, [0, "全部MV"]],
  [areaHongTai, [1, "港台"]],
  [areaMainland, [2, "内地"]],
  [areaEurAme, [3, "欧美"]],
  [areaKorea, [4, "韩国"]],
  [areaJapan, [5, "日本"]],
]);

// 类型字典
const versions = new Map([
  [versionAll, [0, "全部MV"]],
  [versionMv, [1, "MV"]],
  [versionScene, [2, "现场"]],
  [versionCover, [3, "翻唱"]],
  [versionFilm, [4, "电影"]],
  [versionDance, [5, "舞蹈"]],
  [versionVariety, [6, "综艺"]],
  [versionNursery, [7, "儿歌"]],
]);

/**
 * 渲染MV列表标签模板
 * @param {Array} area - 区域数组 [0, "全部MV"] [1, "港台"] [2, "内地"] [3, "欧美"] [4, "韩国"] [5, "日本"]
 */
const renderTagsMarkup = (area, version) => {
  let tagHtml =
    area[0] === 0
      ? version[0] === 0
        ? "全部MV"
        : `<a class="btn-tag"><span>${version[1]}</span> <img data-type="version" src="./data/close.svg"/></a>`
      : version[0] === 0
      ? `<a class="btn-tag"><span>${area[1]}</span> 
      <img data-type="area"  src="./data/close.svg"/>
      </a>`
      : `
      <a class="btn-tag"
      ><span>${area[1]}</span> <img 
      data-type="area"  src="./data/close.svg"
      /></a>
      <a class="btn-tag"
        ><span>${version[1]}</span> <img  data-type="version"  src="./data/close.svg"
      /></a>`;
  detailTitleTag.innerHTML = tagHtml;
  detailList.innerHTML = "";
};

// MV列表渲染
const renderDetails = async (area, version, path, page = 1, callTime = 1) => {
  try {
    renderTagsMarkup(area, version);
    let data = await AJAX(path);
    data = data.filter((item) =>
      !area[0]
        ? !version[0]
          ? item
          : item.version === version[0]
        : !version[0]
        ? item.area === area[0]
        : item.area === area[0] && item.version === version[0]
    );
    pageSum = Math.ceil(data.length / ITEMS_PER_PAGE);
    start = (page - 1) * ITEMS_PER_PAGE;
    end = page * ITEMS_PER_PAGE;
    console.log(start, end);
    data.slice(start, end).forEach((item) => renderItem(item));
    controlPagination(pageSum);
    if (callTime) detailPagination.scrollIntoView();
  } catch (err) {
    renderError(err);
  }
};

// MV图片模板渲染
const renderItem = (item) => {
  let html = `
      <div class="detail-item">
      <a href="./mv.html" target="_blank">
        <img src="${item.picurl}" style="width: 100%" />
        <div class="detail-logo"></div>
        <div class="detail-mask"></div>
      </a>
      <p class="detail-item--song">${item.title}</p>
      <p class="detail-item--singer">${item.singers[0].name}</p>
      <p class="detail-item--info">
        <img src="./data/video.svg" width="20px" />
        ${item.comment_cnt} &nbsp; ${new Date(
    item.pubdate * 1000
  ).toLocaleDateString()}
      </p>
    </div>
    `;
  detailList.insertAdjacentHTML("beforeend", html);
};

// 错误信息渲染
const renderError = (err) => {
  console.error(err.message || err);
  detailList.innerHTML = `<p class="errorMessage">💥💥💥 ${
    err.message || err
  }</p>`;
};

// 点击tag移除标签，并重新渲染MV列表
const removeDetailTag = function (element) {
  // const btnTag = element.parentNode;
  // btnTag.parentNode.removeChild(btnTag);
  const btnTag = element.closest(".btn-tag");
  detailTitleTag.removeChild(btnTag);
  if (element.dataset.type === "version") {
    versionActive.classList.remove("active");
    versionActive = versionAll;
    versionActive.classList.add("active");
    version = [0, "全部MV"];
  } else {
    areaActive.classList.remove("active");
    areaActive = areaAll;
    areaActive.classList.add("active");
    area = [0, "全部MV"];
  }
  renderDetails(area, version, path);
};

// 切换页码，渲染MV列表
const getPage = (page = 1, flag = 0) => {
  if (flag) {
    currentPage = page + 1;
  } else {
    currentPage = page - 1;
  }
  renderDetails(area, version, path, currentPage);
};

// 控制分页模块逻辑
const controlPagination = (pageSum) => {
  if (pageSum <= 0) {
    detailPagination.innerHTML = "";
    detailList.innerHTML = `<p class="emptyMessage">${emptyMessage}</p>`;
  } else {
    renderPagination();
  }
};

// 渲染切换页码
const renderPagination = () => {
  if (currentPage === 1 && pageSum === 1) {
    detailPagination.innerHTML = "";
  } else if (currentPage === 1 && pageSum > 1) {
    detailPagination.innerHTML = `
  <a
    class="page-link"
    data-goto="${currentPage + 1}"
    href="#"
    style="position: absolute; right: 0"
  >
  第${currentPage + 1}页 &raquo;</a
  >
    `;
  } else if (currentPage === pageSum && pageSum > 1) {
    detailPagination.innerHTML = `
  <a
    class="page-link"
    data-goto="${currentPage - 1}"
    href="#"
    style="position: absolute; left: 0"
    >&laquo; 第${currentPage - 1}页</a
  >
    `;
  } else {
    detailPagination.innerHTML = `
  <a
    class="page-link"
    data-goto="${currentPage - 1}"
    href="#"
    style="position: absolute; left: 0"
    >&laquo; 第${currentPage - 1}页</a
  >
  <a
    class="page-link"
    data-goto="${currentPage + 1}"
    href="#"
    style="position: absolute; right: 0"
  >
  第${currentPage + 1}页 &raquo;</a
  >
    `;
  }
};

// 区域切换
areaList.addEventListener("click", function (event) {
  let areaEl = event.target.closest(".tag-item");
  if (!areaEl) return;
  currentPage = 1;
  area = areas.get(areaEl);
  areaActive.classList.remove("active");
  areaActive = areaEl;
  areaActive.classList.add("active");
  renderDetails(area, version, path, currentPage);
});

// 版本切换
versionList.addEventListener("click", function (event) {
  let versionEl = event.target.closest(".tag-item");
  if (!versionEl) return;
  currentPage = 1;
  version = versions.get(event.target);
  versionActive.classList.remove("active");
  versionActive = versionEl;
  versionActive.classList.add("active");
  renderDetails(area, version, path, currentPage);
});

// json来源切换
detailTypeNew.addEventListener("click", function () {
  detailTypeHot.classList.remove("active");
  detailTypeNew.classList.add("active");
  path = `./data/new.json`;
  currentPage = 1;
  renderDetails(area, version, path, currentPage);
});

// json来源切换
detailTypeHot.addEventListener("click", function () {
  detailTypeNew.classList.remove("active");
  detailTypeHot.classList.add("active");
  path = `./data/hot.json`;
  currentPage = 1;
  renderDetails(area, version, path, currentPage);
});

// 监听分页按钮点击事件，切换页码，渲染MV列表
detailPagination.addEventListener("click", function (event) {
  const paginationEl = event.target.closest(".page-link");
  if (!paginationEl) return;
  if (+paginationEl.dataset.goto > currentPage) getPage(currentPage, 1);
  else getPage(currentPage, 0);
});

// 监听tag点击事件，移除标签，并重新渲染MV列表
detailTitleTag.addEventListener("click", function (event) {
  const tagEl = event.target.closest(".btn-tag img");
  if (!tagEl) return;
  removeDetailTag(tagEl);
});

// 初始化 MV列表渲染
const init = () => {
  renderDetails(area, version, path, 1, 0);
};
init();
