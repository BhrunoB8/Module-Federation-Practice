import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import SportService from './sport.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type ISport, Sport } from '@/shared/model/sport.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SportUpdate',
  setup() {
    const sportService = inject('sportService', () => new SportService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const sport: Ref<ISport> = ref(new Sport());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveSport = async sportId => {
      try {
        const res = await sportService().find(sportId);
        sport.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    // if (route.params?.sportId) {
    //   retrieveSport(route.params.sportId);
    // }

    const validations = useValidation();
    const validationRules = {
      title: {},
      description: {},
      author: {},
    };
    const v$ = useVuelidate(validationRules, sport as any);
    v$.value.$validate();

    return {
      sportService,
      alertService,
      sport,
      previousState,
      isSaving,
      currentLanguage,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.sport.id) {
        this.sportService()
          .update(this.sport)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A Sport is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        console.log(this.sport)
        this.sportService()
          .create(this.sport)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A Sport is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
