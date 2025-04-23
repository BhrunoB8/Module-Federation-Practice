import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import SportDetails from './sport-details.vue';
import SportService from './sport.service';
import AlertService from '@/shared/alert/alert.service';

type SportDetailsComponentType = InstanceType<typeof SportDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const sportSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Sport Management Detail Component', () => {
    let sportServiceStub: SinonStubbedInstance<SportService>;
    let mountOptions: MountingOptions<SportDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      sportServiceStub = sinon.createStubInstance<SportService>(SportService);

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          sportService: () => sportServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        sportServiceStub.find.resolves(sportSample);
        route = {
          params: {
            sportId: `${123}`,
          },
        };
        const wrapper = shallowMount(SportDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.sport).toMatchObject(sportSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        sportServiceStub.find.resolves(sportSample);
        const wrapper = shallowMount(SportDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
