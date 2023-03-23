import { RegistrationSteps } from '../enums/registration-steps.enum';

const RegistrationStepMaps = new Map();

RegistrationStepMaps.set(1, RegistrationSteps.RoleDefinition);
RegistrationStepMaps.set(2, RegistrationSteps.PersonalData);
RegistrationStepMaps.set(3, RegistrationSteps.LocationData);
RegistrationStepMaps.set(4, RegistrationSteps.ProfessionalData);
RegistrationStepMaps.set(5, RegistrationSteps.Categories);

export { RegistrationStepMaps };
