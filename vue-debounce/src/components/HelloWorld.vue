<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <Debounce time="500" events="click">
        <button @click="onClick">count:  {{count1}}</button>
    </Debounce>
    <br/>
    <br/>
    <Debounce time="1000" events="click">
        <div>
            <button @click="onClick2">count:  {{count2}}</button>
        </div>
    </Debounce>
    <br/>
    <El-debounce time="1500" events="click">
        <el-button type="primary" @click="onClick3">count:  {{count3}}</el-button>
    </El-debounce>
    <br/>
    <br/>
    <El-debounce time="2000" events="click">
        <div>
            <el-button type="primary" @click="onClick4">count:  {{count4}}</el-button>
        </div>
    </El-debounce>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
    }
  },
  methods: {
      onClick(){
          this.count1++
      },
      onClick2(){
          this.count2++
      },
      onClick3(){
          this.count3++
      },
      onClick4(){
          this.count4++
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
