<template>
  <div class="frame">
    <div class="center">
      <div id="header">
        <div id="sub-left" :style="{'color': uploadSeen ? 'black' : '#bf9d9d'}">
          <font size="2" style="font-weight: bold">UPLOAD IMAGE </font><br />
          <font size="1">Any solution, It's free </font>
        </div>
        <div id="sub-middle">
            <div class="circle">></div>
        </div>
        <div id="sub-right" :style="{'color': uploadSeen ? '#bf9d9d' : 'black'}">
          <font size="2" style="font-weight: bold">SEE RESULT </font><br />
          <font size="1">See all item detected </font>
        </div>
      </div>


      <div class="title">
        <p><font size="6" style="font-weight: bold">{{ title }}</font></p>
        <font size="2">{{ subTitle }} </font>
      </div>


      <div class="dropzone" v-if="uploadSeen">
          <span v-if="dropZoneSeen">
          <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon"/>
          <p><font size="4">DRAG FILES HERE</font></p>
          <p><font size="2">or</font></p>
          <p>
            <font size="2"><a href="">{{ fileName }}</a></font>
          </p>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload" class="upload-input"/>
        </span>
        <div v-if="loaderSeen" class="loaderInfo">
          <p class="loader"></p>
          <p id="p3">
            <font size="2">Please wait. It's about several seconds</font>
          </p>
        </div>  
      </div>


      <div v-if="resultSeen" class="result">
          <div id="main-left">
          <div class="img__wrap">
                <img :src="originImage" class="img__img" id="img-cell">
                <p class="img__description rounded">
                <svg color="white" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg> <font color="white" onclick="document.getElementById('file2').click();">RE-UPLOAD</font>
                <input type="file" id="file2" ref="file" v-on:change="handleFileUpload" style="display:none" v-if=""/>
                </p>
            </div>
        </div>
        <div id="main-middle"></div>
        <div id="main-right">
            <div v-if="resultTagsSeen">
            <p id="showResult">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-tags" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                    <path fill-rule="evenodd" d="M5.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    <path d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                </svg>
                <font size="3" style="font-weight: bold">Item detected</font>
            </p>
            <nav >
                <button v-for="tag in tags" type="button" class="rounded btn-light" style="border-color: #dcdddf"> {{ tag }} </button>
            </nav>
            </div>
            <div v-if="resultLoaderSeen" class="loaderInfo">
                <p class="loader"></p>
                <p id="p3">
                    <font size="2">Please wait. It's about several seconds</font>
                </p>
            </div>
        </div>
      </div>


      <div v-if="errorSeen">
        <p id="p3">
            <font size="2" color="red">Your file is invalid format. Please re-upload</font>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result.vue";

const IMAGE_PROCESSING_API = 'https://7f3t4ql73k.execute-api.us-east-1.amazonaws.com/prod/ria-ai-hashtag-lambda-1'
// const IMAGE_PROCESSING_API = "http://192.168.0.32:5000/search";
const IMAGE_PROCESSING_URL = "http://192.168.0.32:5000"
// const IMAGE_PROCESSING_API = 'http://localhost:5000/'

export default {
  name: "app",
  data() {
    return {
      image: "",
      fileName: "Browse File",
      tags: {},
      uploadSeen:true,
      dropZoneSeen: true,
      loaderSeen: false,
      errorSeen: false,
      resultSeen: false,
      resultLoaderSeen: false,
      resultTagsSeen: true,
      title: "UPLOAD YOUR IMAGE",
      subTitle: "Any resolution, it\'s fine"
    };
  },
  created() {
    console.log("flush storage");
    // localStorage.removeItem('tags');
  },
  
  methods: {
    submitFile() {
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

          this.saveStorage(response.data);

          this.tags = Object.keys(response.data['data'])
          var index = this.tags.indexOf('image');
          if (index !== 'image') {
            this.tags.splice(index, 1);
          }

          if (this.resultSeen) {
            this.resultTagsSeen = true
            this.resultLoaderSeen = false

            console.log(this.originImage)
            this.originImage = URL.createObjectURL(this.file)
            console.log(this.originImage)
          } else {
            this.uploadSeen = false
            this.resultSeen = true
            this.loaderSeen = false
            this.title = "See Result"
            this.subTitle = "__________________"
          }
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
        this.originImage = URL.createObjectURL(this.file)
        if (this.resultSeen) {
            this.dropZoneSeen = false;
            this.resultLoaderSeen = true;
            this.resultTagsSeen = false;
            this.errorSeen = false;
            this.submitFile();
        } else {
            this.dropZoneSeen = false;
            this.loaderSeen = true;
            this.errorSeen = false;
            this.submitFile();
        }
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
<style src="./bootstrap.min.css" scoped></style>