import { RegistrationSteps } from '../enums/registration-steps.enum';

const RegistrationStepMaps = new Map();

RegistrationStepMaps.set(1, RegistrationSteps.RoleDefinition);
RegistrationStepMaps.set(2, RegistrationSteps.PersonalData);
RegistrationStepMaps.set(3, RegistrationSteps.ProfessionalData);
RegistrationStepMaps.set(4, RegistrationSteps.Categories);

export { RegistrationStepMaps };
