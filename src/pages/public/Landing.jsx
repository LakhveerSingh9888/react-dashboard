import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Layers, Shield, Zap } from 'lucide-react';

const Landing = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-6 mt-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {t('landing.heroTitle')} <span className="text-primary-600 dark:text-primary-400">{t('landing.heroHighlight')}</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {t('landing.heroDescription')}
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                    >
                        {t('landing.getStarted')}
                        <ArrowRight className="ml-2 -mr-1" size={20} />
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('landing.viewOnGitHub')}
                    </a>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Layers className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('landing.features.scalableArchitecture.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('landing.features.scalableArchitecture.description')}
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('landing.features.performanceFirst.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('landing.features.performanceFirst.description')}
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('landing.features.authenticationReady.title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('landing.features.authenticationReady.description')}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Landing;
