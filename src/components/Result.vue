<template>
<div>
    <div class="container">
        <div class="row border border-dark" id="img-cell">
            <div class="col-6 col-md-3 ">
                <div class="img__wrap">
                    <img :src="originImage" class="rounded mx-auto d-block img-thumbnail img__img"  >
                    <p class="img__description rounded">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                    <a href="" data-reveal-id="exampleModal">RE-UPLOAD</a>
                    </p>
                </div>
            </div>
            <div class="col-6 clo-md-9">
                <p>
                    <svg width="3em" height="2em" viewBox="0 0 16 16" class="bi bi-tags" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                        <path fill-rule="evenodd" d="M5.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                        <path d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                    </svg>
                    <font size="5">Item detected</font>
                </p>
                <nav style="display: flex" >
                    <button v-for="tag in tags"  type="button" class="btn btn-light" style="border-color: #dcdddf" v-on:click="webcamSendRequestButton(tag)"> {{ tag }}</button>
                </nav>
            </div>
        </div>
        <br>
        <div class="alert alert-dark" role="alert">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            
            157.000.000 <font color=#6c757d>Results for </font> {{ tag }} <font color=#6c757d>(About 0.01s)</font>
        </div>
        <div class="row" >
            <!-- <div class="col-3 clo-md-3">
                <img :src="link" v-bind:alt="link" >
            </div> -->
            <div v-for="(link, index) in links" class="col-3 clo-md-12">
                <img :src="link" v-bind:alt="link" class="rounded mx-auto d-block img-thumbnail">
            </div>
        </div>
        </div>


    <div id="container2">
        <div id="exampleModal" class="reveal-modal">
            <h2>POP UP</h2>
            <p>
            <font size="4">window window window.window window window. window.
                </font>
            </p>
            <a href="#" class="close-reveal-modal">×</a>
        </div>
    </div>
</div>
</template>

<script>

const IMAGE_PROCESSING_URL = 'http://192.168.0.32:5000'
export default {
    data () {
        return {
            tags: [],
            hashtags: {},
            links: [],
            originImage: '',
            tag: ''
        }
    },
    methods: {
        webcamSendRequestButton (value) {
            console.log(value)
            this.tag = value
            this.links = this.buildURL(this.hashtags[value])
        },
        buildURL(arr) {
            var link = 0
            var images = []
            for (link in arr) {
                images.push(IMAGE_PROCESSING_URL  + arr[link])
            }
            return images
        }
    },
    created () {
        var currentUrl = window.location.pathname;
        console.log(currentUrl);

        if (localStorage.tags) {
                console.log('##########')
                var response = JSON.parse(localStorage.tags)
                this.tags = Object.keys(response['data'])
                this.tags.splice(0, 1)
                this.hashtags = response['data']
                this.originImage = IMAGE_PROCESSING_URL + response['data']['image']
                this.links = this.buildURL(this.hashtags[this.tags[0]])
                console.log(this.tags)
                console.log(this.originImage)
                this.tag = tags[0]
            }
    }
}
</script>


<style src="./screen2.css" scoped></style>
<style src="./bootstrap.min.css" scoped></style>
