<template>
  <div>
    <div id="backgroundImg"></div>
    <the-header />
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <the-footer />
  </div>
</template>

<script>
import { ethers } from "ethers";
import MarketData from "./contracts/Market";
import FoodData from "./contracts/Food";
import PetData from "./contracts/Pet";

export default {
  async created() {
    await this.$store.dispatch("setupMetamask");
    const signer = this.$store.getters.provider.getSigner(
      this.$store.getters.userAddress
    );

    const Market = new ethers.Contract(MarketData.address, MarketData.abi);
    const Food = new ethers.Contract(await Market.token(), FoodData.abi);
    const Pet = new ethers.Contract(await Market.pet(), PetData.abi);

    Market.connect(signer);
    Food.connect(signer);
    Pet.connect(signer);
  },
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  user-select: none;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* End of reset */
body {
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  overflow-x: hidden;
}

#backgroundImg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(174, 204, 255);
  background: linear-gradient(
    135deg,
    rgba(174, 204, 255, 0.5) 0%,
    rgba(120, 108, 255, 0.5) 50%,
    rgba(255, 85, 234, 0.5) 100%
  );
}

.route-enter-from {
  opacity: 0;
}
.route-leave-to {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
}
/* scrollbar */
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(0, 0, 0);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, rgb(33, 0, 43) 0, rgb(60, 0, 60) 75%);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to right,
    rgba(33, 0, 43, 0.75) 0,
    rgba(60, 0, 60, 0.75) 75%
  );
}
</style>