//SERVICE_ID_USER   = "service_yyc267l";  
//SERVICE_ID_OWNER  = "service_tz682kd";
//TEMPLATE_USER     = "template_4y5aais";
//TEMPLATE_OWNER    = "template_vqqsl5c";

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ contact.js loaded");

  const form = document.getElementById("contactForm");  //contactForm

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    // collect form data
    const formData = {
      name: form.querySelector("[name='name']").value,
      email: form.querySelector("[name='email']").value,
      subject: form.querySelector("[name='subject']").value,
      message: form.querySelector("[name='message']").value,
    };

    // 🚀 Send confirmation to user
    emailjs.send("service_yyc267l", "template_4y5aais", formData)
      .then(() => {
        console.log("✅ Confirmation email sent to user");

        // 🚀 Send notification to owner
        return emailjs.send("service_tz682kd", "template_vqqsl5c", formData);
      })
      .then(() => {
        console.log("✅ Notification email sent to owner");

        loading.style.display = "none";
        sentMessage.style.display = "block";
        form.reset();
      })
      .catch((error) => {
        console.error("❌ EmailJS error:", error);
        loading.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.innerText = "Something went wrong. Please try again.";
      });
  });
});



