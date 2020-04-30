import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('component render empty without user', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {},
    });
    expect(wrapper.isEmpty()).toBe(true);
  });

  it('check emitting empty data on submit', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        user: {
          name: 'John Doe',
        },
        value: {
          test: 'test',
        },
      },
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().input[0][0].text).toBeNull();
    expect(wrapper.emitted().input[0][0].email).toBeNull();
  });

  it('check emitting text on submit', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        user: {
          name: 'John Doe',
        },
        value: {
          test: 'test',
        },
      },
    });
    const msg = 'text';
    wrapper.find('input[name="text"]').setValue(msg);
    wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().input[0][0].text).toEqual(msg);
  });

  it('check validation, emit empty data', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        user: {
          name: 'John Doe',
        },
        value: {
          test: 'test',
        },
      },
    });

    let email = 'text';
    wrapper.find('input[name="email"]').setValue(email);
    wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().input[0][0].email).toBeNull();

    email = 'abcdef@mail.ru';
    wrapper.find('input[name="email"]').setValue(email);
    wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().input[1][0].email).toEqual(email);
  });
});
