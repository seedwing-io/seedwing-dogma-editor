/******************************************************************************
 * This file was generated by langium-cli 1.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { SeedwingDogmaAstReflection } from './ast';
import { SeedwingDogmaGrammar } from './grammar';

export const SeedwingDogmaLanguageMetaData: LanguageMetaData = {
    languageId: 'seedwing-dogma',
    fileExtensions: ['.dog'],
    caseInsensitive: false
};

export const SeedwingDogmaGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new SeedwingDogmaAstReflection()
};

export const SeedwingDogmaGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => SeedwingDogmaGrammar(),
    LanguageMetaData: () => SeedwingDogmaLanguageMetaData,
    parser: {}
};
