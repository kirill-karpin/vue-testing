<template>
  <div v-if="user">
    {{ user.name }}
    <form class="hello" v-on:submit.prevent="submit">
      <h3>Message form</h3>
      <template v-for="field in fields">
        <label :key="field.name">
          {{ field.name}}
          <input :name="field.name" :type="field.type" v-model="field.value"/>
        </label>
      </template>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    user: Object,
    value: {
      type: Object,
      default: () => {},
    },
    testVal: String,
  },
  computed: {
    input() {
      const result = {};
      this.fields.map((v) => {
        let { value } = v;
        if (v.validate) {
          value = (v.validate(v.value) ? v.value : null);
        }
        result[v.name] = value;
        return null;
      });
      return result;
    },
  },
  data() {
    return {
      fields: [
        {
          name: 'text',
          type: 'text',
          value: null,
        },
        {
          name: 'email',
          type: 'text',
          value: null,
          validate: (item) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(item).toLowerCase());
          },
        },
      ],
    };
  },
  created() {
  },
  methods: {
    submit() {
      this.$emit('input', this.input);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  form {
    padding: 0;
  }

  label {
    display: inline-block;
    margin: 0 10px;
  }

  input {
    color: #42b983;
  }
</style>
