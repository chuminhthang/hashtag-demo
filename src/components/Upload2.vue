<template>
  <div class="frame">
    <div class="center">
      <div id="header">
        <div id="sub-left">
          <font size="2" style="font-weight: bold">UPLOAD IMAGE </font><br />
          <font size="1">Any solution, It's free </font>
        </div>
        <div id="sub-middle"></div>
        <div id="sub-right">
          <font size="2" style="font-weight: bold">SEE RESULT </font><br />
          <font size="1">See all item detected </font>
        </div>
      </div>
      <div class="title">
        <p><font size="6" style="font-weight: bold">UPLOAD YOUR IMAGE</font></p>
        <font size="2">Any resolution, it's fine</font>
      </div>

      <div class="dropzone">
        <span v-if="dropZoneSeen">
          <img
            src="http://100dayscss.com/codepen/upload.svg"
            class="upload-icon"
          />
          <p><font size="4">DRAG FILES HERE</font></p>
          <p><font size="2">or</font></p>
          <p>
            <font size="2"
              ><a href="">{{ fileName }}</a></font
            >
          </p>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload"
            class="upload-input"
          />
        </span>
        <div v-if="uploadedSeen" class="uploaded">
          <p id="p1">
            <svg
              width="3em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-file-earmark-arrow-up"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
              />
              <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
              <path
                fill-rule="evenodd"
                d="M8 12a.5.5 0 0 0 .5-.5V7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 7.707V11.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
            <font size="4"> {{ fileName }}</font>
          </p>
          <p id="p2" name="uploadbutton" v-on:click="submitFile()">
            <font size="2" style="color: blue; text-decoration-line: underline"
              >Process Image</font
            >
          </p>
        </div>
        <div v-if="loaderSeen" class="loaderInfo">
          <p class="loader"></p>
          <p id="p3">
            <font size="2">Please wait. It's about several seconds</font>
          </p>
        </div>
      </div>

      <div v-if="errorSeen">
        <p id="p3">
          <font size="2" color="red"
            >Your file is invalid format. Please re-upload</font
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result.vue";

// const IMAGE_PROCESSING_API = 'http://192.168.0.32:8000/api/upload_image/'
const IMAGE_PROCESSING_API = "http://192.168.0.32:5000/search";
// const IMAGE_PROCESSING_API = 'http://localhost:5000/'

export default {
  name: "app",
  data() {
    return {
      image: "",
      fileName: "Browse File",
      tags: {},
      dropZoneSeen: true,
      uploadedSeen: false,
      loaderSeen: false,
      errorSeen: false,
    };
  },
  created() {
    console.log("flush storage");
    // localStorage.removeItem('tags');
  },
  methods: {
    submitFile() {
      this.uploadedSeen = false;
      this.loaderSeen = true;
      let formData = new FormData();
      formData.append("image", this.file);
      this.$axios
        .post(IMAGE_PROCESSING_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            alert(response.data.success);
          }
          this.tags = response.data;
          this.saveStorage(this.tags);
          //   this.$router.push('Result')
          let routeData = this.$router.resolve({ name: "Result" });
          window.open(routeData.href, "_blank");
          this.$router.go();
        });
    },

    handleFileUpload(e) {
      this.file = this.$refs.file.files[0];
      this.fileName = e.target.files[0].name;

      var isValid = false;
      var validTypes = [".jpg", ".png", ".bmp", ".jpeg", ".tif"];
      var type = 0;
      for (type in validTypes) {
        console.log(type);
        if (this.fileName.includes(validTypes[type])) {
          isValid = true;
        }
      }
      console.log(isValid);

      if (isValid) {
        this.dropZoneSeen = false;
        // this.uploadedSeen = true
        this.loaderSeen = true;
        this.errorSeen = false;
        this.submitFile();
      } else {
        this.errorSeen = true;
      }
      console.log(e);
    },

    saveStorage(data) {
      localStorage.tags = JSON.stringify(data);
    },
  },
};
</script>

<style src="./screen1.css" scoped></style>
