<template>
  <div class="stores">


          <div class="flex sm:flex-row flex-col items-center w-full">
            <div class="flex-shrink-0 m-4">
              <img
                  src="../assets/img/Desy_logo_3c_web.svg"
                  alt="Logo"
                  class="w-16 h-16"
              />
            </div>
            <!--
                           Area for messages from back end
                           Currently conditional render based on error or warning
                       -->
          <div class="w-full min-h-24">
            <article class="m-2 px-12 py-4 border-l-4" v-bind:class="[isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-800']">
              <div class="text-xl">
                {{message}}
              </div>
            </article>
          </div>
            <div class="flex justify-end items-center">
              <div class="flex-col text-center">
              <button
                  type="button"
                  @click="doLogout"
                  class="w-16 h-16 text-white bg-link hover:bg-blue-800 rounded-full p-3 m-2"
                  title="Logout"
              >
                <i class="fa fa-lock fa-2x"></i>
              </button>
              </div>
              <div class="flex-col text-center">
                <div class="" style="display: inline-block; background-color: #3273dc; padding: 8px; border-radius: 8px;">
                  <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-logout.svg' @click="processScan('action=logout&value=undefined')">
                </div>
                <p class="">Logout</p>
              </div>
            </div>
          </div>
          <!-- First set of columns are the top form elements -->
            <div class="flex flex-col sm:flex-row">

                <!-- Form element to set locations -->
                <div class="w-1/2 border border-solid border-black m-2 p-2">
                    <h2 class="text-3xl text-center font-bold">Please, scan or click on Location</h2>
                    <form>
                      <div class="mb-3 px-2">
                            <label class="block text-gray-700">Location</label>
                            <input ref="location" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="location" placeholder="Scan the location e.g. PICKING-POINT,  DEWAR-HOTEL or BEAMLINE">
                        </div>

                      <h2 class="text-3xl text-center font-bold">Locations:</h2>
                      <br />
                      <div class="flex flex-col sm:flex-row">
                        <div class="w-1/2 mt-4">
                          <div class="flex-col text-center">
                            <div class="">
                              <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-dewar-hotel.svg' @click="processScan('action=location&value=DEWAR-HOTEL')">
                            </div>
                            <p class="">DEWAR-HOTEL</p>
                          </div>
                        </div>
                        <div class="w-1/2 mt-4">
                          <div class="flex-col text-center">
                            <div class="">
                              <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-p11-rack.svg' @click="processScan('action=location&value=P11-RACK')">
                            </div>
                            <p class="">P11-RACK</p>
                          </div>
                        </div>
                        <div class="w-1/2 mt-4">
                          <div class="flex-col text-center">
                            <div class="">
                              <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-beamline.svg' @click="processScan('action=location&value=BEAMLINE')">
                            </div>
                            <p class="">BEAMLINE</p>
                          </div>
                        </div>
                        <div class="w-1/2 mt-4">
                          <div class="flex-col text-center">
                            <div class="">
                              <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-picking-point.svg' @click="processScan('action=location&value=PICKING-POINT')">
                            </div>
                            <p class="">PICKING-POINT-OUT</p>
                          </div>
                        </div>
                      </div> <!-- END STORES LOCATIONS -->

                      <h2 class="text-3xl text-center font-bold">Please, scan dewar barcode</h2>
                        <div class="mb-3 px-2">
                            <label class="block text-gray-700">Barcode</label>
                            <input ref="barcode" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="barcode" placeholder="Scan the QR code / barcode from the dewar case">
                        </div>

                        <!-- If location is STORES-IN do not show AWB field...
                        <div v-show="location.toUpperCase() != 'STORES-IN'" class="mb-3 px-2">
                            <label class="block text-gray-700">Airway Bill</label>
                            <input ref="awb" type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="awb" v-on:keydown.enter="onAwbEnter" placeholder="Scan the DHL / FedEx Airway Bill">
                        </div> -->

                        <div class="flex">
                            <!--button type="submit" class="text-white bg-link hover:bg-blue-800 rounded p-1 m-2 w-1/2" v-on:click="onSetLocation">Submit</button>
                            <button type="cancel" class="text-white bg-info hover:bg-blue-600 rounded p-1 m-2 w-1/2"  v-on:click="onClearLocationForm">Cancel</button-->
                          <div class="w-1/2 mt-4">
                            <div class="flex-col text-center">
                              <div class="" style="display: inline-block; background-color: #3273dc; padding: 15px; border-radius: 15px;">
                                <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-submit.svg' @click="processScan('action=submit&value=undefined')">
                              </div>
                              <p class="">Submit</p>
                            </div>
                          </div>
                          <div class="w-1/2 mt-4">
                            <div class="flex-col text-center">
                              <div class="" style="display: inline-block; background-color: #209cee; padding: 15px; border-radius: 15px;">
                                <img class="inline-block cursor-pointer" width=128 src='../assets/img/qr-cancel.svg' @click="processScan('action=cancel&value=undefined')">
                              </div>
                              <p class="">Cancel</p>
                            </div>
                          </div>
                        </div>
                    </form>
                </div>

              <div class="w-1/2 border border-solid border-black m-2 p-2 ">
                <!--section>
                  <h2 class="text-3xl text-center font-bold py-2">Find a Dewar</h2>
                  <form>
                    <div class="mb-3 px-2">
                      <label class="block text-gray-700">BarCode</label>
                      <input type="text" class="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="barcode" placeholder="e.g. DLS-MX-####">
                    </div>
                    <div class="flex">
                      <button type="submit" class="text-white bg-link hover:bg-blue-800 rounded p-1 m-2 w-1/2" v-on:click="getDewars(barcode, $event)">Search</button>
                      <button type="submit" class="text-white bg-info hover:bg-blue-600 rounded p-1 m-2 w-1/2" v-on:click="onClearFindForm">Cancel</button>
                    </div>
                  </form>
                </section-->


                <!-- Display the stores history -->
                <div class="flex flex-col m-2 p-2">
                  <h1 class="text-3xl font-bold text-center p-1">History</h1>
                  <table class="border border-solid bg-white w-full">
                    <thead class="text-left bg-white-300 font-bold border border-solid">
                    <th class="border px-3 py-2">Date/Time</th><th class="border px-3 py-2">Barcode</th><th class="border px-3 py-2">Location</th><th class="border px-3 py-2">Status</th>
                    </thead>
                    <tbody class="">
                    <tr v-for="(dewar, index) in dewars" v-bind:key="index" class="hover:bg-blue-200">
                      <td class="p-2 border">{{dewar.date}}</td>
                      <td class="p-2 border">{{dewar.barcode.toUpperCase()}}</td>
                      <td class="p-2 border">{{dewar.storageLocation.toUpperCase()}}</td>
                      <td class="p-2 border">{{dewar.destination}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>


            </div> <!-- End of columns -->

        <footer class="py-4">
            <!-- Only here to provide some padding -->
        </footer>
  </div>
</template>

<script>
// Importing axios so we can cancel requests
import {Howl} from 'howler'
import scannerMixin from '@/mixins/scannerMixin'

export default {
  name: 'stores',
    data() {
      return {
        // Array for dewar history
        dewars: [],
        // Data elements for form input
        barcode: '',
        location: '',
        awb: '',
        // Error message on find dewar, set location etc
        // isError if actual error, info otherwise
        message: "",
        isError: false,
        isFormOK: true,
        clearMessageInterval: 6*1000, // Message interval in milliseconds
        logoutTimeout: null,
        refreshInterval: 3600*1000, // Page Refresh interval in milliseconds (i.e. every hour)
      }
    },
    // Initialize the sound library and files
    created: function() {
      const base = this.$router.options.base || ''

        this.sounds = {}
        this.sounds.success = new Howl({
            src: [`${base}/static/audio/success.mp3`, `${base}/static/audio/success.wav`]
        });
        this.sounds.fail = new Howl({
            src: [`${base}/static/audio/fail.mp3`, `${base}/static/audio/fail.wav`]
        });
    },
    // Lifecycle hook - called when Vue is mounted on the page...
    mounted: function() {
        console.log("UI for Store page is mounted")

        // When page is loaded set focus to the input location element
        // this.$refs.location.focus();

      window.addEventListener('keydown', this.onKeyDown)

      this.logoutTimeout =  setTimeout(() => {
        this.$router.push('/');
      }, this.refreshInterval)
    },
    beforeDestroy() {
      console.log("UI for Store page is destroyed")
      window.removeEventListener('keydown', this.onKeyDown)
      if(this.logoutTimeout)
        clearTimeout(this.logoutTimeout)
    },
    watch: {
        message: function(val) {
            if (val !== "") {
                console.log("Clear message after " + this.clearMessageInterval + " s ")
                setTimeout(this.clearMessages, this.clearMessageInterval)
            }
        }
    },
    mixins: [scannerMixin],
    methods: {
        refresh: function() {
            // window.localStorage.setItem('location', this.location)
            // We don't need to reload the page - just request an update from the server
            this.getDewars(barcode)
        },
        doLogout: function(){
            this.$router.push('/');
        },
        setBarcode: function (value){
          this.barcode = value;
        },
        // Main method that retrieves dewar history from database
        getDewars: async function(barcode) {
          let self = this
          self.dewars = []


          const token = this.$store.getters['auth/token'];
          const url = `/ispyb/ispyb-ws/rest/${token}/dewar/${barcode}/history`

          try {
            const response = await this.$http.get(url);
            const dewars = response.data;

            dewars.forEach(dewar => {
              self.dewars.push(dewar)
            })

            self.playSuccess()
            self.message = "Found transport history for Dewar[" + barcode + "]"
            self.isError = false

          } catch(error){
            console.log("Error getting initial data")
            self.playFail();
            self.message = "No data found for Dewar[" + barcode + "] due to " + error.message
            self.isError = true
          }
        },
      setLocation: function(location){
          this.location = location;
      },

        // Method to update dewar location in database
        onSetLocation: async function() {
            console.log("onSetLocation")

            let self = this
            let validLocation = this.isValidLocation(this.location)

            if (this.barcode && this.location && validLocation) {
                const barcode = this.barcode
                const location = this.location
                const username = this.$store.getters['auth/currentUser'] // user name

                let formData = new FormData();
                formData.append('barCode', barcode)
                formData.append('location', location)
                formData.append('username', username)

              const token = this.$store.getters['auth/token'];
              const url = `/ispyb/ispyb-ws/rest/${token}/dewar/location`;
              try {
                await this.$http.post(url, formData, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  }
                }); // goes to api/stores/routes.py or to Java server
                self.playSuccess()
                console.log("onSetLocation, Stores.vue")

                self.message = "Updated " + barcode + " to " + location
                self.isError = false

                // Request updated locations from DB
                await self.getDewars(barcode)
              } catch(error){
                console.log(error)
                self.message = "Error updating " + barcode + " to " + location
                self.isError = true
                self.playFail();
              } finally {
                // Set focus to barcode (likely to want to reuse location)
                // this.$refs.barcode.focus()
                // Rest form values (Keep location element as is)
                this.barcode = ''
                this.awb = ''
              }
            } else {
                this.message = "Issue with form: "
                this.isError = true
                if (this.barcode === "") {
                    this.message += " no barcode provided..."
                }
                if (this.location === "") {
                    this.message += ' no location provided...'
                } else if (!validLocation) {
                    this.message += ' location not valid for this application...'
                }
            }
        },
        // Reset Form fields
        onClearLocationForm: function() {
            this.barcode = ''
            this.location = ''
            this.awb = ''
            // When form is cleared, set focus to the input location element
            // this.$refs.location.focus();
        },
        // Clear error/info messages in one go
        clearMessages: function() {
          this.message = ""
          this.isError = false
        },
        // Internal validation method - check for valid location (stores in or out)
        isValidLocation: function(location) {
            if (location.toUpperCase() === "PICKING-POINT" || location.toUpperCase() === "DEWAR-HOTEL" || location.toUpperCase() === "BEAMLINE") {
                return true;
            } else {
                return false;
            }
        },
        // Audio feedback methods
        playSuccess: function() {
            console.log("HAPPY BEEPS")
            this.sounds.success.play()
        },
        playFail: function() {
            console.log("SAD BEEPS")
            this.sounds.fail.play()
        },
    }
}
</script>


<!-- Small style changes to override default table colours -->
<style>
tr:nth-child(even) {
  @apply bg-blue-100;
}
</style>
