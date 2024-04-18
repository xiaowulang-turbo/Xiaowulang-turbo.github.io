"use strict";

const inputAccount = document.querySelector(".input-account"); // 获取输入框元素
const alertAccount = document.querySelector(".alert-account"); // 获取提示元素
const inputPassword = document.querySelector(".input-password"); // 获取密码输入框元素
const alertPassword = document.querySelector(".alert-password"); // 获取密码提示元素
const inputPasswordEnsure = document.querySelector(".input-password--ensure"); // 获取确认密码输入框元素
const alertPasswordEnsure = document.querySelector(".alert-password--ensure"); // 获取确认密码提示元素
const inputEmail = document.querySelector(".input-email"); // 获取邮箱输入框元素
const alertEmail = document.querySelector(".alert-email"); // 获取邮箱提示元素
const inputPhone = document.querySelector(".input-phone"); // 获取手机号输入框元素
const alertPhone = document.querySelector(".alert-phone"); // 获取手机号提示元素
const inputIdcardnumber = document.querySelector(".input-idcardnumber"); // 获取身份证号输入框元素
const alertIdcardnumber = document.querySelector(".alert-idcardnumber"); // 获取身份证号提示元素

const inputSubmit = document.querySelector(".input-submit"); // 获取提交按钮元素
const form = document.querySelector(".container form"); // 获取表单元素
const iconAccount = document.querySelector(".icon-account"); // 获取账号图标元素
const iconPassword = document.querySelector(".icon-password"); // 获取密码图标元素
const iconPasswordEnsure = document.querySelector(".icon-password--ensure"); // 获取确认密码图标元素
const iconEmail = document.querySelector(".icon-email"); // 获取邮箱图标元素
const iconPhone = document.querySelector(".icon-phone"); // 获取手机号图标元素
const iconIdcardnumber = document.querySelector(".icon-idcardnumber"); // 获取身份证号图标元素

// alertAccount.style.display = "none"; // 初始化提示元素为隐藏状态

// 输入提示元素字典
const references = new Map([
  [inputAccount, alertAccount],
  [inputPassword, alertPassword], // 输入框元素和提示元素的引用
  [inputPasswordEnsure, alertPasswordEnsure],
  [inputEmail, alertEmail],
  [inputPhone, alertPhone],
  [inputIdcardnumber, alertIdcardnumber],
]);

const icons = new Map([
  [inputAccount, iconAccount],
  [inputPassword, iconPassword], // 输入框元素和图标元素的引用
  [inputPasswordEnsure, iconPasswordEnsure],
  [inputEmail, iconEmail],
  [inputPhone, iconPhone],
  [inputIdcardnumber, iconIdcardnumber],
]);

// 正则表达式字典
const regexes = new Map([
  [inputAccount, /^[a-zA-Z][a-zA-Z0-9_-]{4,9}$/],
  [inputPassword, /^[a-zA-Z0-9_-]{6,10}$/],
  [inputPasswordEnsure, /^[a-zA-Z0-9_-]{6,18}$/],
  [inputEmail, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/],
  [inputPhone, /^1[3-9]\d{9}$/],
  [inputIdcardnumber, /(^\d{17}(\d|X|x)$)/],
]);

// 判断输入是否有效
const checkValid = function (element) {
  // 添加输入事件监听器到输入框元素上
  let value = element.value; // 获取输入框的值
  let referElement = references.get(element); // 获取对应的提示元素
  let referRegex = regexes.get(element); // 获取对应的正则表达式
  let iconElement = icons.get(element); // 获取对应的图标元素
  if (element === inputPasswordEnsure) {
    if (!value || !referRegex.test(value) || value !== inputPassword.value) {
      referElement.style.display = "";
    } else {
      referElement.style.display = "none"; // 初始化提示元素为隐藏状态
    }

    if ((value) && value === inputPassword.value) {
      iconElement.style.opacity = 1; // 显示提示元素和隐藏图标元素
    } else {
      iconElement.style.opacity = 0; // 隐藏图标元素
    }
  } else {
    if (!value || !referRegex.test(value)
    ) {
      referElement.style.display = "";
    } else {
      referElement.style.display = "none"; // 初始化提示元素为隐藏状态
    }

    if (referRegex.test(value)) {
      iconElement.style.opacity = 1; // 显示提示元素和隐藏图标元素
    } else {
      iconElement.style.opacity = 0; // 隐藏图标元素
    }
  }
};

// 失去焦点时判断
const checkBlur = function (element) {
  let value = element.value; // 获取输入框的值
  let referElement = references.get(element); // 获取对应的提示元素
  let referRegex = regexes.get(element); // 获取对应的正则表达式
  if (!value) {
    referElement.style.display = "none";
  } else {
    checkValid(element);
  }

};

alertAccount.style.display = "none"; // 初始化提示元素为隐藏状态
alertPassword.style.display = "none"; // 初始化提示元素为隐藏状态
alertPasswordEnsure.style.display = "none"; // 初始化提示元素为隐藏状态
alertEmail.style.display = "none"; // 初始化提示元素为隐藏状态
alertPhone.style.display = "none"; // 初始化提示元素为隐藏状态
alertIdcardnumber.style.display = "none"; // 初始化提示元素为隐藏状态

// inputAccount.addEventListener("input", function () {
//   checkValid(inputAccount);
// }); // 添加输入事件监听器

// inputPassword.addEventListener("input", function () {
//   checkValid(inputPassword);
// }); // 添加输入事件监听器

// inputPasswordEnsure.addEventListener("input", function () {
//   checkValid(inputPasswordEnsure);
// });
// inputEmail.addEventListener("input", function () {
//   checkValid(inputEmail);
// });

// inputPhone.addEventListener("input", function () {
//   checkValid(inputPhone);
// });
// inputIdcardnumber.addEventListener("input", function () {
//   checkValid(inputIdcardnumber);
// });

/*  */

inputAccount.addEventListener("focus", function () {
  checkValid(inputAccount);
}); // 添加输入事件监听器

inputPassword.addEventListener("focus", function () {
  checkValid(inputPassword);
}); // 添加输入事件监听器

inputPasswordEnsure.addEventListener("focus", function () {
  checkValid(inputPasswordEnsure);
});
inputEmail.addEventListener("focus", function () {
  checkValid(inputEmail);
});

inputPhone.addEventListener("focus", function () {
  checkValid(inputPhone);
});
inputIdcardnumber.addEventListener("focus", function () {
  checkValid(inputIdcardnumber);
});
inputAccount.addEventListener("blur", function () {
  checkBlur(inputAccount);
}); // 添加输入事件监听器

inputPassword.addEventListener("blur", function () {
  checkBlur(inputPassword);
}); // 添加输入事件监听器

inputPasswordEnsure.addEventListener("blur", function () {
  checkBlur(inputPasswordEnsure);
});
inputEmail.addEventListener("blur", function () {
  checkBlur(inputEmail);
});

inputPhone.addEventListener("blur", function () {
  checkBlur(inputPhone);
});
inputIdcardnumber.addEventListener("blur", function () {
  checkBlur(inputIdcardnumber);
});

inputSubmit.addEventListener("click", function (e) {
  // console.log(1);
  checkValid(inputAccount);
  checkValid(inputPassword);
  checkValid(inputPasswordEnsure);
  checkValid(inputEmail);
  checkValid(inputPhone);
  checkValid(inputIdcardnumber);
  e.preventDefault();
});

// console.log(form);

// Event delegation
const delegation = function (event) {
  // console.log(2);
  // console.log(event);
  // console.log(event.target);
  checkValid(event.target);
};

// form.addEventListener("click", delegation);
form.addEventListener("input", delegation);
//form.addEventListener("blur", checkBlur);
