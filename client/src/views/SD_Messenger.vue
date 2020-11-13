<template>
  <div>
    <v-app-bar dense flat app id="transparent">
      <template v-slot:img="{  }">
        <v-img
          class="mt-1"
          transition="scroll-y-reverse-transition"
          height="50"
          contain
          lazy-src="../assets/Image/SD Messenger Logs.png"
          src="../assets/Image/SD Messenger Logs.png"
        ></v-img>
      </template>
      <template v-slot:extension>
        <v-row justify="center">
          <v-col cols="auto">
            <v-hover v-slot:default="{ hover }">
              <v-btn small :outlined="hover" @click="mRefresh()">
                <v-icon left>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-hover>
            <input type="file" ref="file" style="display:none" @change="processFile($event,true)" />
          </v-col>

          <v-col cols="auto">
            <v-menu transition="slide-y-transition" bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-hover v-slot:default="{ hover }">
                  <v-btn small :outlined="hover" v-on="on">
                    <v-icon left>mdi-file-import-outline</v-icon>Import SD Messenger Logs
                  </v-btn>
                </v-hover>
              </template>

              <v-card class="text-center">
                <v-card-subtitle class="pa-1">
                  <v-icon left dense>mdi-file-question-outline</v-icon>Import SD messenger log?
                </v-card-subtitle>
                <v-card-actions class="px-1 pb-1 pt-0">
                  <v-spacer></v-spacer>
                  <v-btn color="error" text small>No</v-btn>
                  <v-btn color="success" small @click="mChangePath()">Yes</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>

          <v-col cols="auto">
            <v-menu transition="slide-y-transition" bottom offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-hover v-slot:default="{ hover }">
                  <v-btn small :outlined="hover" v-on="on">
                    <v-icon left>mdi-cog-outline</v-icon>SD Messenger Logs Settings
                  </v-btn>
                </v-hover>
              </template>

              <v-card class="text-center">
                <v-card-subtitle class="pa-1">
                  <v-icon small left>mdi-cog-outline</v-icon>SD Messenger Logs Settings
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="error"
                        small
                        right
                        v-on="on"
                        @click="mResetColor()"
                      >mdi-cog-clockwise</v-icon>
                    </template>
                    <span>Reset Settings</span>
                  </v-tooltip>
                </v-card-subtitle>
                <v-card-text class="text-left">
                  <v-divider></v-divider>
                  <p class="ma-0 mt-1">
                    <v-menu
                      transition="slide-y-transition"
                      left
                      offset-x
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="sStrColorBackground"
                          class="mr-1"
                          outlined
                          small
                          icon
                          text
                          v-on="on"
                        >
                          <v-icon small>mdi-desktop-mac-dashboard</v-icon>
                        </v-btn>Background Color
                      </template>
                      <v-color-picker class="ma-2" hide-inputs v-model="cStrColorBackground"></v-color-picker>
                    </v-menu>
                  </p>
                  <p class="ma-0 mt-1">
                    <v-menu
                      transition="slide-y-transition"
                      left
                      offset-x
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="sStrColorBubleSender"
                          class="mr-1"
                          outlined
                          small
                          icon
                          text
                          v-on="on"
                        >
                          <v-icon small>mdi-android-messages</v-icon>
                        </v-btn>Sender message color
                      </template>
                      <v-color-picker class="ma-2" hide-inputs v-model="cStrColorBubleSender"></v-color-picker>
                    </v-menu>
                  </p>
                  <p class="ma-0 mt-1">
                    <v-menu
                      transition="slide-y-transition"
                      left
                      offset-x
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="sStrColorBubleSelf"
                          class="mr-1"
                          outlined
                          small
                          icon
                          text
                          v-on="on"
                        >
                          <v-icon small>mdi-android-messages</v-icon>
                        </v-btn>My message color
                      </template>
                      <v-color-picker class="ma-2" hide-inputs v-model="cStrColorBubleSelf"></v-color-picker>
                    </v-menu>
                  </p>
                  <p class="ma-0 mt-1">
                    <v-menu
                      transition="slide-y-transition"
                      left
                      offset-x
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :color="sStrColorAttachment"
                          class="mr-1"
                          outlined
                          small
                          icon
                          text
                          v-on="on"
                        >
                          <v-icon small>mdi-file</v-icon>
                        </v-btn>Attachment color
                      </template>
                      <v-color-picker class="ma-2" hide-inputs v-model="cStrColorAttachment"></v-color-picker>
                    </v-menu>
                  </p>
                  <v-divider class="mt-1"></v-divider>
                  <p class="ma-0 mt-1">
                    <v-switch
                      class="ma-0"
                      dense
                      hide-details
                      v-model="cBlnSortByAsc"
                      label="Sort Date Ascending"
                      @change="mGetConversation(strUserClick)"
                    ></v-switch>
                  </p>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </template>
    </v-app-bar>

    <v-row no-gutters>
      <v-col cols="3" class="px-1">
        <v-card tile id="Card">
          <v-card-title>
            <v-img
              transition="scroll-y-reverse-transition"
              height="25"
              contain
              lazy-src="../assets/Image/System user.png"
              src="../assets/Image/System user.png"
            ></v-img>
          </v-card-title>
          <v-card-text>
            <v-text-field dense v-model="strFilterUser" label="Search User" solo hide-details>
              <template v-slot:append>
                <v-icon small>mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-card-text>

          <v-scale-transition>
            <v-card-text class="py-0">
              <v-list dense id="content">
                <v-list-item-group mandatory v-model="sample">
                  <v-list-item
                    @click="mGetConversation(item)"
                    v-for="item in mfilterTxtUser()"
                    :key="item"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span v-if="strFilterUser">
                          <template
                            v-for="(fragment, i) in item.toString().split(new RegExp(`(?<=${strFilterUser})|(?=${strFilterUser})`, 'i'))"
                          >
                            <mark
                              v-if="fragment.toLowerCase() === strFilterUser.toLowerCase()"
                              :key="i"
                              class="highlight"
                            >{{fragment}}</mark>
                            <template v-else>{{fragment}}</template>
                          </template>
                        </span>
                        <template v-else>{{item}}</template>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-scale-transition>
        </v-card>
      </v-col>

      <v-col cols="9" class="px-1">
        <v-card tile id="Card">
          <v-card-title>
            <v-img
              transition="scroll-y-reverse-transition"
              height="25"
              contain
              lazy-src="../assets/Image/Conversation.png"
              src="../assets/Image/Conversation.png"
            ></v-img>
          </v-card-title>
          <v-card-text>
            <v-row class="pt-0" no-gutters justify="space-around">
              <v-col cols="6">
                <v-autocomplete
                  solo
                  dense
                  hide-details
                  v-model="strFilterDate"
                  :items="objFilterDate"
                  label="Filter Date"
                ></v-autocomplete>
              </v-col>

              <v-col cols="5">
                <v-text-field dense v-model="strFilterText" label="Search Text" solo hide-details>
                  <template v-slot:append>
                    <v-icon small>mdi-magnify</v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-scale-transition>
            <v-card-text class="py-0">
              <v-container fluid id="content">
                <div v-for="(item,i) in mfilterTxtConv()" :key="i">
                  <v-row no-gutters>
                    <v-col cols="12" :align="mCheckSide(item.header) ">
                      <h5 style="margin:0" :class="('text'-mCheckSide(item.header))">
                        <v-chip
                          x-small
                          v-for="(file,i) in mGetFile(item.file)"
                          :key="i"
                          v-show="item.file!=''"
                          :color="sStrColorAttachment"
                        >{{file}}</v-chip>
                      </h5>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-textarea
                            v-on="on"
                            :style="mCheckColor(item.header)"
                            readonly
                            :value="(item.text.trim())"
                            auto-grow
                            outlined
                            hide-details
                            rows="1"
                            dense
                          ></v-textarea>
                        </template>
                        <span>{{item.date}}</span>
                      </v-tooltip>
                      <span :class="('text'-mCheckSide(item.header))">{{item.header}}</span>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
          </v-scale-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      sample: "",
      strUserClick: "",
      data: "",
      strFilterUser: "",
      strFilterDate: "",
      strFilterText: "",
      objFilterDate: [],
      objAllData: [],
      objLogs: [],
      txtUser: [],
      txtdata: [],
      txtConv: [],
      filterDay: []
    };
  },
  watch: {},
  computed: {
    cBlnDark: {
      get() {
        return this.sBlnDark;
      },
      set(value) {
        this.$store.commit("CHANGE_sBlnDark", value);
      }
    },
    cBlnDrawer: {
      get() {
        return this.sBlnDrawer;
      },
      set(value) {
        this.$store.commit("CHANGE_sBlnDrawer", value);
      }
    },
    cBlnSortByAsc: {
      get() {
        return this.sBlnSortByAsc;
      },
      set(value) {
        this.$store.commit("CHANGE_sBlnSortByAsc", value);
      }
    },
    cStrColorBubleSender: {
      get() {
        return this.sStrColorBubleSender;
      },
      set(value) {
        this.$store.commit("CHANGE_sStrColorBubleSender", value);
      }
    },
    cStrColorBubleSelf: {
      get() {
        return this.sStrColorBubleSelf;
      },
      set(value) {
        this.$store.commit("CHANGE_sStrColorBubleSelf", value);
      }
    },
    cStrColorAttachment: {
      get() {
        return this.sStrColorAttachment;
      },
      set(value) {
        this.$store.commit("CHANGE_sStrColorAttachment", value);
      }
    },
    cStrColorBackground: {
      get() {
        return this.sStrColorBackground;
      },
      set(value) {
        this.$store.commit("CHANGE_sStrColorBackground", value);
      }
    }
  },
  methods: {
    mDrawer() {
      this.CHANGE_sBlnDrawer(!this.sBlnDrawer);
    },
    mChangePath() {
      this.$refs.file.click();
    },
    mfilterTxtUser() {
      if (this.txtUser.length != 0) {
        return this.txtUser.filter(rec => {
          return rec
            .trim()
            .toUpperCase()
            .includes(this.strFilterUser.trim().toUpperCase());
        });
      } else {
        return [];
      }
    },
    mfilterTxtConv() {
      if (this.txtConv.length != 0) {
        return this.txtConv.filter(rec => {
          return (
            rec.text
              .trim()
              .toUpperCase()
              .includes(this.strFilterText.trim().toUpperCase()) &&
            rec.date.includes(
              this.strFilterDate == "All" ? "" : this.strFilterDate
            )
          );
        });
      } else {
        return [];
      }
    },
    mGetFile(file) {
      if (file != undefined) {
        let attachment = file.trim().replace("(files)", "");
        return attachment.split(",");
      } else {
        return "";
      }
    },
    mRefresh() {
      this.processFile(this.objLogs, false);
    },
    processFile(event, blnDel) {
      this.txtdata = [];
      this.txtUser = [];
      this.txtConv = [];
      this.filterDay = [];

      if (blnDel) {
        this.strUserClick = "";
        this.strFilterDate = "";
        this.strFilterUser = "";
        this.strFilterText = "";
      }

      this.objLogs = event;
      var input = event.target;
      var reader = new FileReader();
      var self = this;
      reader.onload = function() {
        self.objAllData = reader.result.split(
          "=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*="
        );
        self.mGetData();
      };
      reader.readAsText(input.files[0]);
    },
    mGetData() {
      if (this.objAllData.length == 1) {
        this.$notification.error({
          message: "SD messenger logs",
          description: "Invalid Log File!"
        });
      }

      for (var i = 1; i < this.objAllData.length; i += 2) {
        let alldata = this.objAllData[i].split("\r\n");
        let header = this.objAllData[i].split("\r\n  at");
        let intfile = alldata[alldata.length - 2].search("(files)");

        this.txtdata.push({
          header: header[0].trim(),
          date:
            intfile != -1
              ? alldata[alldata.length - 3].trim().replace("at", "")
              : alldata[alldata.length - 2].trim().replace("at", ""),
          text: this.objAllData[i + 1],
          file: intfile != -1 ? alldata[alldata.length - 2].trim() : ""
        });
      }

      let revData = this.txtdata.reverse();
      for (var a = 0; a < this.txtdata.length; a++) {
        let strdata = revData[a].header.trim().replace("From: ", "");
        strdata = strdata.trim().replace("To: ", "");

        if (this.txtUser.indexOf(strdata) == -1) {
          this.txtUser.push(strdata);
        }
      }
      if (this.strUserClick != "") {
        this.mGetConversation(this.strUserClick);
      }
    },
    mGetConversation(User) {
      this.strUserClick = User;
      this.objFilterDate = [];
      this.txtConv = this.txtdata.filter(rec => {
        return (
          rec.header
            .trim()
            .toUpperCase()
            .includes("FROM: " + User.trim().toUpperCase()) ||
          rec.header
            .trim()
            .toUpperCase()
            .includes("TO: " + User.trim().toUpperCase())
        );
      });

      this.txtConv = this.txtConv.reverse();

      this.objFilterDate.push("All");
      for (var a = 0; a < this.txtConv.length; a++) {
        let objdate = this.txtConv[a].date.split(" ");
        let date = this.txtConv[a].date.replace(
          objdate[objdate.length - 1],
          ""
        );
        if (this.objFilterDate.indexOf(date) == -1) {
          this.objFilterDate.push(date);
        }
      }
      this.strFilterDate = this.objFilterDate[this.objFilterDate.length - 1];
      if (this.sBlnSortByAsc) this.txtConv = this.txtConv.reverse();
    },
    mcheckClick(items) {
      if (items == this.strUserClick) {
        return "border:none;background-color:grey";
      } else {
        return "border:none;";
      }
    },

    mCheckSide(header) {
      let data = header.split(" ");
      if (data[0].trim() == "From:") {
        return "left";
      } else {
        return "right";
      }
    },
    mCheckColor(header) {
      let data = header.split(" ");
      if (data[0].trim() == "From:") {
        return "width:80%;background-color:" + this.sStrColorBubleSender;
      } else {
        return "width:80%;background-color:" + this.sStrColorBubleSelf;
      }
    },
    mGetFromTo() {
      if (this.sBlnDark) {
        return "color:white";
      } else {
        return "color:black";
      }
    },
    mResetColor() {
      this.$store.commit("CHANGE_sStrColorBubleSender", "#FFFFFF00");
      this.$store.commit("CHANGE_sStrColorBubleSelf", "#FFFFFF00");
      this.$store.commit("CHANGE_sStrColorAttachment", "#FFFFFF00");
      this.$store.commit("CHANGE_sStrColorBackground", "#D2D2D2");
    }
  }
};
</script>

<style >
.centered-input input {
  text-align: center;
}
#Card {
  height: calc(100vh - 100px);
  background-color: transparent;
}
#content {
  width: 100%;
  min-height: calc(100vh - 230px);
  max-height: calc(100vh - 230px);
  overflow-y: auto;
  overflow-x: hidden;
  background-color: transparent;
  border: 2px solid white;
}
</style>
