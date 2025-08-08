import React from 'react';
import { Link } from 'react-router-dom';
import {
  CubeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2070&auto=format&fit=crop"
          alt="Sari-sari store shelves"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />
        <div className="relative z-10 container py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-5xl text-white leading-tight">SariSari IMS</h1>
            <p className="mt-3 text-base sm:text-xl text-white/85">
              Simple, fast, and intuitive inventory management tailored for sari-sari stores. Track stock, get low-stock alerts, and keep your mini-store running smoothly.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/inventory"
                className="btn btn-primary px-5 py-3 w-full sm:w-auto"
              >
                Start Managing Inventory
              </Link>
              <a
                href="#features"
                className="btn btn-ghost bg-white/10 text-white border-transparent hover:bg-white/20 px-5 py-3 backdrop-blur w-full sm:w-auto text-center"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-14">
        <h2 className="text-2xl sm:text-3xl">Everything you need to run a small store</h2>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Designed for sari-sari owners: know what to restock, what sells, and what to price — all in one place.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            Icon={CubeIcon}
            title="Inventory Tracking"
            description="Add products, set prices, and watch stock levels in real time."
          />
          <FeatureCard
            Icon={ExclamationTriangleIcon}
            title="Low-stock Alerts"
            description="Never run out. Get visual cues when items are running low."
          />
          <FeatureCard
            Icon={ChartBarIcon}
            title="Sales Insight"
            description="Understand trends at a glance to guide daily decisions."
          />
          <FeatureCard
            Icon={BoltIcon}
            title="Fast & Simple"
            description="Clean, responsive UI built with speed and simplicity in mind."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container py-14">
          <h2 className="text-2xl sm:text-3xl">How it works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="1"
              title="Add your products"
              description="Input items, prices, categories, and quantities."
               img="https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2070&auto=format&fit=crop"
            />
            <StepCard
              step="2"
              title="Track and organize"
              description="Browse, search, and filter by categories for quick access."
              img="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1975&auto=format&fit=crop"
            />
            <StepCard
              step="3"
              title="Restock with confidence"
              description="Use low-stock indicators to plan your next purchase."
               img="https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?q=80&w=2072&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="container py-14">
        <div className="relative overflow-hidden rounded-2xl bg-brand-600 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl">Ready to tidy up your inventory?</h3>
              <p className="mt-2 text-white/90 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" /> No sign-up needed locally. Start now.
              </p>
            </div>
            <Link
              to="/inventory"
              className="btn bg-white text-brand-700 hover:bg-white px-5 py-3 w-full sm:w-auto"
            >
              Go to Inventory
            </Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500 flex items-center gap-2">
          <DocumentTextIcon className="h-4 w-4" /> This is a local demo app for sari-sari store inventory management.
        </p>
      </section>
    </div>
  );
}

function FeatureCard({ Icon, title, description }) {
  return (
    <div className="group card card-padding card-hover">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-brand-50 p-2 text-brand-600">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg">{title}</h3>
      </div>
      <p className="mt-3 text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description, img }) {
  return (
    <div className="card overflow-hidden">
      <div className="h-36 w-full overflow-hidden">
        <img src={img} alt="step visual" className="h-full w-full object-cover" />
      </div>
      <div className="card-padding">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold">
          {step}
        </div>
        <h4 className="mt-3 text-lg">{title}</h4>
        <p className="mt-1 text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

