<template>
  <div>
    <form class="form" @submit="mintPet">
      <label class="form-label" for="amount"
        >Image of your
        <span @click="etherscanPet" class="FOOD">Pet</span>:</label
      >
      <div @click="pickImage" class="form-input">
        Pick
        <input ref="inputElement" type="file" @change="imagePickedHandler" />
      </div>
      <div v-if="image" class="form-message imageName">{{ image.name }}</div>
      <div v-if="errorMessage" class="form-message error">
        {{ errorMessage }}
      </div>
      <button v-if="image" class="form-button" type="submit">Mint</button>
    </form>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
      image: null,
      loading: false,
    };
  },
  methods: {
    async mintPet(e) {
      e.preventDefault();
      this.loading = true;
      const _imageUri = await this._uploadToIPFS(this.image);
      const _tokenUri = await this._uploadToIPFS(
        JSON.stringify({
          title: "Asset Metadata",
          type: "object",
          properties: {
            name: "",
            description: "",
            image: _imageUri,
          },
        })
      );
      try {
        await this.$store.getters.PetContract.mint(_tokenUri);
        this.$router.push("/");
      } catch (err) {
        console.log(err.message);
      } finally {
        this.loading = false;
      }
    },
    async etherscanPet() {
      window.open(
        "https://ropsten.etherscan.io/address/" +
          await this.$store.getters.MarketContract.pet(),
        "_blank"
      );
    },
    pickImage() {
      this.$refs.inputElement.click();
    },
    imagePickedHandler({ target }) {
      const uploadedFile = target.files[0];
      if (!uploadedFile.type.startsWith("image")) {
        this.image = null;
        this.errorMessage = "Invalid file type! Please upload a image file";
        return;
      }
      this.image = uploadedFile;
      this.errorMessage = "";
    },
    async _uploadToIPFS(data) {
      return (
        "https://ipfs.io/ipfs/" +
        (await this.$store.getters.ipfs.add(data)).path
      );
    },
  },
};
</script>


<style scoped>
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(43, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 20rem;
  max-width: 50%;
  padding: 1rem 1.5rem;
  height: 12rem;
  max-height: 75%;
  border-radius: 3rem;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.25);
  color: white;
  text-shadow: 2px 2px black;
}

.form-label {
  font-size: 1.8rem;
  text-align: center;
  padding: 0.4rem 0;
}

.FOOD {
  transition: all 0.5s ease-in-out;
}

.FOOD:hover {
  color: rgb(27, 0, 20);
  cursor: pointer;
  text-shadow: none;
}

.form-input {
  font-size: 1.2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 1.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 10rem;
  padding: 0.2rem 0.8rem;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}

.form-input:hover {
  width: 18%;
}

.form-input input {
  display: none;
}

.form-message {
  font-size: 0.6rem;
  font-family: sans-serif;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px black;
  transform: translateY(-2px);
  transition: all 0.25s ease-in-out;
}

.form-message:hover {
  font-size: 0.65rem;
}

.error {
  color: rgb(255, 0, 0);
}

.form-button {
  cursor: pointer;
  background-color: rgba(27, 0, 20, 0.65);
  border: none;
  color: white;
  font-size: 1.2rem;
  padding: 0.3rem 1rem;
  border-radius: 5px;
  text-shadow: 1px 1px black;
  box-shadow: 2px 2px 5px black;
  transition: all 0.25s ease-in-out;
  -webkit-tap-highlight-color: transparent;
}

.form-button:hover {
  transform: translateY(-2px);
}
</style>