import { ValidationChecks } from 'langium';
import { SeedwingDogmaAstType } from './generated/ast';
import type { SeedwingDogmaServices } from './seedwing-dogma-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: SeedwingDogmaServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.SeedwingDogmaValidator;
    const checks: ValidationChecks<SeedwingDogmaAstType> = {
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class SeedwingDogmaValidator {

}
