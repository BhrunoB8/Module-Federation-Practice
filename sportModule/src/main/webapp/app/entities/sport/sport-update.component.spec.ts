import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import SportUpdate from './sport-update.vue';
import SportService from './sport.service';
import AlertService from '@/shared/alert/alert.service';

type SportUpdateComponentType = InstanceType<typeof SportUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const sportSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<SportUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Sport Management Update Component', () => {
    let comp: SportUpdateComponentType;
    let sportServiceStub: SinonStubbedInstance<SportService>;

    beforeEach(() => {
      route = {};
      sportServiceStub = sinon.createStubInstance<SportService>(SportService);
      sportServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          sportService: () => sportServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(SportUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.sport = sportSample;
        sportServiceStub.update.resolves(sportSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(sportServiceStub.update.calledWith(sportSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        sportServiceStub.create.resolves(entity);
        const wrapper = shallowMount(SportUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.sport = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(sportServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        sportServiceStub.find.resolves(sportSample);
        sportServiceStub.retrieve.resolves([sportSample]);

        // WHEN
        route = {
          params: {
            sportId: `${sportSample.id}`,
          },
        };
        const wrapper = shallowMount(SportUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.sport).toMatchObject(sportSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        sportServiceStub.find.resolves(sportSample);
        const wrapper = shallowMount(SportUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
