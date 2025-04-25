import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import Entities from "@/entities/entities.component.ts";

export default defineComponent({
  components: {Entities},
  compatConfig: { MODE: 3 },
  name: 'EntitiesMenu',
  setup() {
    const i18n = useI18n();
    return {
      t$: i18n.t,
    };
  },
});
