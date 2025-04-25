import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SportService from './sport.service';
import { type ISport } from '@/shared/model/sport.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SportDetails',
  setup() {
    const sportService = inject('sportService', () => new SportService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const sport: Ref<ISport> = ref({});

    const retrieveSport = async sportId => {
      try {
        const res = await sportService().find(sportId);
        sport.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.sportId) {
      retrieveSport(route.params.sportId);
    }

    return {
      alertService,
      sport,

      previousState,
    };
  },
});
