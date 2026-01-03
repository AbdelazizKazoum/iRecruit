/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonalInformationDto } from './dto/create-candidature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidature } from 'src/schemas/candidature.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { Logger } from '@nestjs/common';

interface ResumeContact {
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  cin?: string;
}

interface ResumeLink {
  label?: string;
  url?: string;
}

interface ResumeExperience {
  position?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  highlights?: string[];
}

interface ResumeEducation {
  title?: string;
  institution?: string;
  speciality?: string;
  level?: string;
  mention?: string;
  year?: string;
}

interface ResumeCertification {
  name?: string;
  issuer?: string;
  credentialId?: string;
  url?: string;
  year?: string;
}

interface ResumeProject {
  name?: string;
  role?: string;
  tech?: string;
  url?: string;
  description?: string;
  year?: string;
}

interface ResumeLanguage {
  name?: string;
  level?: string;
}

interface ResumePublication {
  title?: string;
  type?: string;
  url?: string;
  year?: string;
}

interface ResumeCommunication {
  title?: string;
  url?: string;
  year?: string;
}

interface ResumeExtras {
  handicap?: string;
  fonctionnaire?: boolean;
}

interface Resume {
  fullName?: string;
  title?: string;
  contact?: ResumeContact;
  links?: ResumeLink[];
  summary?: string;
  keywords?: string[];
  skills?: string[];
  tools?: string[];
  experience?: ResumeExperience[];
  education?: ResumeEducation[];
  certifications?: ResumeCertification[];
  projects?: ResumeProject[];
  languages?: ResumeLanguage[];
  publications?: ResumePublication[];
  communications?: ResumeCommunication[];
  extras?: ResumeExtras;
}

@Injectable()
export class CandidatureService {
  constructor(
    @InjectModel(Candidature.name)
    private candidatureModel: Model<Candidature>,
    private fileUploadService: FileUploadService,
  ) {}

  //-------------------------------------------------------------------------
  // Save Personal Information
  async savePersonalInformations(
    personalInformationDto: PersonalInformationDto,
    files: any,
    user: any, // The user object passed in the request
  ) {
    const { cin } = personalInformationDto;

    // Define upload path dynamically
    const uploadPath = `uploads/candidats/${cin}`;
    const allowedFormats = ['pdf']; // Define allowed formats

    // Upload files and get their paths
    const filePaths = await this.fileUploadService.uploadFiles(
      files,
      uploadPath,
      allowedFormats,
    );

    // Check if a candidature already exists for the given user
    const existingCandidature = await this.candidatureModel.findOne({
      user: user._id,
    });

    if (existingCandidature) {
      // Update only the personalInformation field and preserve professionalInformation
      existingCandidature.personalInformation = {
        valid: true,
        ...personalInformationDto,
        files: filePaths,
      };

      // Save the updated candidature
      return existingCandidature.save();
    }

    // If no existing candidature, create a new one
    const newCandidature = new this.candidatureModel({
      user: user._id, // Associate with the user
      personalInformation: {
        valid: true,
        ...personalInformationDto,
        files: filePaths,
      },
      professionalInformation: {
        valid: false,
        parcoursEtDiplomes: [],
        experiences: [],
        niveauxLangues: [],
        experiencePedagogique: [],
        publications: [],
        communications: [],
        residanat: [],
        autresDocuments: [],
      }, // Initialize empty professionalInformation
    });

    return newCandidature.save();
  }
  // ----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Save diplomes
  async saveDiplomes(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/diplomes`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        parcoursEtDiplomes: [
          ...existingCandidature.professionalInformation.parcoursEtDiplomes,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.parcoursEtDiplomes;
    } catch (error) {
      console.error('Error saving candidature:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Save languages
  async saveLanguages(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/languages`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      let filePaths = {};
      if (files.length > 0) {
        console.log('🚀 ~ CandidatureService ~ saveLanguages ~ files:', files);

        filePaths = await this.fileUploadService.uploadFiles(
          files,
          uploadPath,
          allowedFormats,
        );
      }

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        niveauxLangues: [
          ...existingCandidature.professionalInformation.niveauxLangues,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.niveauxLangues;
    } catch (error) {
      console.error('Error saving languages:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------
  // Save languages
  async savePublications(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/Publications`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the professionalInformation
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        publications: [
          ...existingCandidature.professionalInformation.publications,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.publications;
    } catch (error) {
      console.error('Error saving publications:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // Save languages
  async saveCommunications(data, files: any, user: any) {
    try {
      // Check if a candidature already exists for the given user
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      // Define upload path dynamically
      const uploadPath = `uploads/candidats/${existingCandidature.personalInformation.cin}/communications`;
      const allowedFormats = ['pdf']; // Define allowed formats

      // Upload files and get their paths
      const filePaths = await this.fileUploadService.uploadFiles(
        files,
        uploadPath,
        allowedFormats,
      );

      // Update only the communications
      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        communications: [
          ...existingCandidature.professionalInformation.communications,
          { ...data, files: filePaths },
        ],
      };

      // Save the updated candidature
      const savedCandidature = await existingCandidature.save(); // Make sure to await here

      return savedCandidature.professionalInformation.communications;
    } catch (error) {
      console.error('Error saving communication:', error);
      throw new InternalServerErrorException('Failed to save data');
    }
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // Save work experiences (no files)
  async saveExperiences(data: any, user: any) {
    try {
      const existingCandidature = await this.candidatureModel.findOne({
        user: user._id,
      });

      if (!existingCandidature) {
        throw new NotFoundException('Not found!');
      }

      existingCandidature.professionalInformation = {
        ...existingCandidature.professionalInformation,
        experiences: [
          ...(existingCandidature.professionalInformation.experiences || []),
          data,
        ],
      };

      const savedCandidature = await existingCandidature.save();
      return savedCandidature.professionalInformation.experiences;
    } catch (error) {
      console.error('Error saving experiences:', error);
      throw new InternalServerErrorException('Failed to save experiences');
    }
  }
  //----------------------------------------------------------------------------

  async findAll(): Promise<Candidature[]> {
    return this.candidatureModel.find().exec();
  }

  async findMyCandidature(user): Promise<Candidature> {
    try {
      return await this.candidatureModel.findOne({ user: user._id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateCandidature(user): Promise<Candidature> {
    try {
      // Update the candidature's professionalInformation field
      const updatedCandidature = await this.candidatureModel.findOneAndUpdate(
        { user: user._id }, // Match by user._id instead of _id
        { $set: { 'professionalInformation.valid': true } }, // Update professionalInformation.valid
        { new: true, runValidators: true }, // Return the updated document
      );

      if (!updatedCandidature) {
        throw new NotFoundException('Candidature or Language not found');
      }
      return updatedCandidature;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} candidature`;
  }

  // update(id: number, updateCandidatureDto: PersonalInformationDto) {
  //   return `This action updates a #${id} candidature`;
  // }

  remove(id: number) {
    return `This action removes a #${id} candidature`;
  }

  async buildResumeTemplate(user) {
  const candidature = await this.candidatureModel.findOne({ user: user._id });
  if (!candidature) {
    throw new NotFoundException('Aucune candidature trouvée pour cet utilisateur');
  }

  const personal = (candidature.personalInformation as Record<string, any>) || {};
  const professional = (candidature.professionalInformation as Record<string, any>) || {};

  const education =
    professional.parcoursEtDiplomes?.map((diplome) => ({
      title: diplome?.intituleDiplome || '',
      level: diplome?.diplomeType || '',
      speciality: diplome?.specialite || '',
      institution: diplome?.etablissement || '',
      year: diplome?.anneeObtention || '',
      mention: diplome?.mention || '',
    })) || [];

  const languages =
    professional.niveauxLangues?.map((langue) => ({
      name: langue?.langue || '',
      level: langue?.niveau || '',
    })) || [];

  const publications =
    professional.publications?.map((pub) => ({
      title: pub?.titre || '',
      year: pub?.anneePublication || '',
      type: pub?.type || '',
      url: pub?.url || '',
    })) || [];

  const communications =
    professional.communications?.map((com) => ({
      title: com?.titre || '',
      year: com?.anneeCommunication || '',
      url: com?.url || '',
    })) || [];

  // ✅ Fix: merge experiences + pedagogical experiences instead of using || (which drops data)
    const workExperiences =
      (professional.experiences || []).map((exp) => ({
        position: exp?.position || '',
        company: exp?.company || '',
        startDate: exp?.startDate || '',
        endDate: exp?.endDate || '',
        currentlyWorking: !!exp?.currentlyWorking,
        location: exp?.location || '',
        description: exp?.description || '',
        highlights: Array.isArray(exp?.highlights)
          ? exp.highlights
          : typeof exp?.highlights === 'string'
            ? exp.highlights
                .split('\n')
                .map((h) => h.trim())
                .filter(Boolean)
            : [],
      }));

  const pedagogicalExperiences =
    (professional.experiencePedagogique || []).map((exp) => ({
      position: exp?.poste ? `Expérience pédagogique — ${exp.poste}` : 'Expérience pédagogique',
      company: exp?.etablissement || '',
      startDate: exp?.dateDebut || '',
      endDate: exp?.dateFin || '',
      currentlyWorking: false,
      location: exp?.ville || '',
      description: exp?.experiencePedagogiqueEnHeures
        ? `${exp.experiencePedagogiqueEnHeures} heures`
        : (exp?.description || ''),
      highlights: [],
    }));

  const experience = [...workExperiences, ...pedagogicalExperiences];

  // Optional “ATS sections” (safe defaults if you don’t have fields yet)
  const skills = professional.skills || []; // you can store later (array of strings)
  const tools = professional.tools || [];   // array of strings
  const certifications = professional.certifications || []; // [{name, issuer, year, credentialId, url}]
  const projects = professional.projects || []; // [{name, role, year, description, tech, url}]
  const links = professional.links || []; // [{label, url}] e.g. LinkedIn, GitHub, Portfolio
  const keywords = professional.keywords || []; // array of strings (ATS keyword bank)

  return {
    fullName: `${personal?.prenom || ''} ${personal?.nom || ''}`.trim(),
    title: professional?.title || personal?.specialite || '',

    contact: {
      email: personal?.email || '',
      phone: personal?.telephone || '',
      address: personal?.adresse || '',
      city: personal?.ville || '',
      country: personal?.pays || '',
      cin: personal?.cin || '',
    },

    links,

    // Replace placeholder with something more ATS-friendly
    summary:
      professional?.summary ||
      'Résumé professionnel (3–4 phrases) : expertise principale, domaines clés, résultats mesurables, et poste recherché.',

    keywords, // ATS keyword bank

    skills, // “Core Skills”
    tools,  // “Tools & Technologies”

    experience,
    education,
    certifications,
    projects,

    languages,
    publications,
    communications,

    extras: {
      handicap: personal?.situationDeHandicap?.typeHandicap || '',
      fonctionnaire: personal?.experiences?.fonctionnaire || false,
    },
  };
  }


  buildResumeHtml(resume): string {
  const safe = (v) => (v ?? '').toString().replace(/[<>]/g, ''); // basic safety
  const joinDot = (...parts) => parts.filter(Boolean).join(' · ');

  const renderBullets = (items: string[]) => {
    const clean = (items || []).map((x) => safe(x)).filter(Boolean);
    if (!clean.length) return '';
    return `<ul>${clean.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  };

  const renderTags = (items: string[]) => {
    const clean = (items || []).map((x) => safe(x)).filter(Boolean);
    if (!clean.length) return `<div class="muted">Non renseigné</div>`;
    return `<div class="tags">${clean.map((x) => `<span class="tag">${x}</span>`).join('')}</div>`;
  };

  const renderLinks = (links: any[]) => {
    const list = Array.isArray(links) ? links : [];
    const clean = list
      .map((l) => ({ label: safe(l?.label), url: safe(l?.url) }))
      .filter((l) => l.label && l.url);

    if (!clean.length) return '';
    return `<div class="muted">${clean.map((l) => `${l.label}: ${l.url}`).join(' · ')}</div>`;
  };

  return `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        @page { margin: 16mm 14mm; }
        
        * { box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; 
          color: #1f2937; 
          line-height: 1.5; 
          font-size: 11px;
          margin: 0;
          padding: 0;
          background: #ffffff;
        }
        
        /* Header Section */
        .header {
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 2.5px solid #2563eb;
          background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
          padding: 16px;
          margin: -8px -8px 16px -8px;
        }
        
        .name {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #111827;
          letter-spacing: -0.5px;
        }
        
        .title {
          font-size: 14px;
          margin: 2px 0 8px 0;
          font-weight: 600;
          color: #2563eb;
          letter-spacing: 0.3px;
        }
        
        /* Typography */
        .muted {
          color: #6b7280;
          font-size: 10.5px;
        }
        
        .small {
          font-size: 10px;
          line-height: 1.4;
        }
        
        /* Section Headers */
        .h2 {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 8px 0;
          color: #1f2937;
          padding-bottom: 4px;
          border-bottom: 1.5px solid #e5e7eb;
          position: relative;
        }
        
        .h2::before {
          content: '';
          position: absolute;
          bottom: -1.5px;
          left: 0;
          width: 40px;
          height: 1.5px;
          background: #2563eb;
        }
        
        /* Sections */
        .section {
          margin: 14px 0;
          page-break-inside: avoid;
        }
        
        .block {
          margin: 0 0 10px;
          padding: 8px 0;
          page-break-inside: avoid;
        }
        
        .block:not(:last-child) {
          border-bottom: 1px solid #f3f4f6;
        }
        
        /* Layout */
        .row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }
        
        .left {
          flex: 1;
          min-width: 0;
        }
        
        .right {
          white-space: nowrap;
          color: #6b7280;
          font-size: 10.5px;
          font-weight: 500;
          background: #f9fafb;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
        }
        
        /* Text Styles */
        .role {
          font-weight: 700;
          font-size: 12px;
          color: #111827;
          margin-bottom: 2px;
        }
        
        .org {
          font-weight: 600;
          font-size: 11.5px;
          color: #374151;
          margin-bottom: 2px;
        }
        
        /* Lists */
        ul {
          margin: 6px 0 0 18px;
          padding: 0;
          list-style-type: none;
        }
        
        li {
          margin: 0 0 4px;
          padding-left: 14px;
          position: relative;
          line-height: 1.5;
        }
        
        li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #2563eb;
          font-weight: bold;
          font-size: 10px;
        }
        
        /* Tags */
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        
        .tag {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1e40af;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        /* Utilities */
        .hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 12px 0;
        }
        
        /* Print Optimization */
        @media print {
          body {
            font-size: 10.5px;
          }
          
          .section {
            page-break-inside: avoid;
          }
          
          .block {
            page-break-inside: avoid;
          }
          
          .tag {
            border-color: #94a3b8;
            background: #f1f5f9;
          }
        }
      </style>
    </head>
    <body>

      <!-- Header -->
      <div class="header">
        <div class="name">${safe(resume.fullName || 'Candidat')}</div>
        ${resume.title ? `<div class="title">${safe(resume.title)}</div>` : ''}

        <div class="muted small">
          ${joinDot(
            safe(resume.contact?.email),
            safe(resume.contact?.phone),
            safe(resume.contact?.address),
            safe(resume.contact?.city),
            safe(resume.contact?.country),
          )}
        </div>

        ${renderLinks(resume.links)}
      </div>

      <!-- Summary -->
      <div class="section">
        <div class="h2">Professional Summary</div>
        <div class="block">${safe(resume.summary)}</div>
      </div>

      <!-- Keywords (optional but ATS-friendly) -->
      ${
        Array.isArray(resume.keywords) && resume.keywords.length
          ? `
          <div class="section">
            <div class="h2">Keywords</div>
            ${renderTags(resume.keywords)}
          </div>
        `
          : ''
      }

      <!-- Core Skills -->
      <div class="section">
        <div class="h2">Core Skills</div>
        ${renderTags(resume.skills)}
      </div>

      <!-- Tools & Technologies -->
      <div class="section">
        <div class="h2">Tools & Technologies</div>
        ${renderTags(resume.tools)}
      </div>

      <!-- Experience -->
      <div class="section">
        <div class="h2">Experience</div>
        ${
          (resume.experience && resume.experience.length)
            ? resume.experience.map((exp) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="role">${safe(exp.position)}</div>
                    <div class="muted">
                      ${joinDot(safe(exp.company), safe(exp.location))}
                    </div>
                  </div>
                  <div class="right">
                    ${joinDot(
                      safe(exp.startDate),
                      exp.currentlyWorking ? 'Present' : safe(exp.endDate)
                    )}
                  </div>
                </div>

                ${exp.description ? `<div class="muted" style="margin-top:4px;">${safe(exp.description)}</div>` : ''}

                ${Array.isArray(exp.highlights) && exp.highlights.length ? renderBullets(exp.highlights) : ''}
              </div>
            `).join('')
            : `<div class="muted">Non renseigné</div>`
        }
      </div>

      <!-- Education -->
      <div class="section">
        <div class="h2">Education</div>
        ${
          (resume.education && resume.education.length)
            ? resume.education.map((edu) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="org">${safe(edu.title)}</div>
                    <div class="muted">
                      ${joinDot(safe(edu.institution), safe(edu.speciality), safe(edu.level))}
                    </div>
                    ${edu.mention ? `<div class="muted">Mention: ${safe(edu.mention)}</div>` : ''}
                  </div>
                  <div class="right">${safe(edu.year)}</div>
                </div>
              </div>
            `).join('')
            : `<div class="muted">Non renseigné</div>`
        }
      </div>

      <!-- Certifications -->
      ${
        (resume.certifications && resume.certifications.length)
          ? `
          <div class="section">
            <div class="h2">Certifications</div>
            ${resume.certifications.map((c) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="org">${safe(c.name)}</div>
                    <div class="muted">${joinDot(safe(c.issuer), safe(c.credentialId), safe(c.url))}</div>
                  </div>
                  <div class="right">${safe(c.year)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `
          : ''
      }

      <!-- Projects -->
      ${
        (resume.projects && resume.projects.length)
          ? `
          <div class="section">
            <div class="h2">Projects</div>
            ${resume.projects.map((p) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="org">${safe(p.name)}</div>
                    <div class="muted">${joinDot(safe(p.role), safe(p.tech), safe(p.url))}</div>
                    ${p.description ? `<div class="muted" style="margin-top:4px;">${safe(p.description)}</div>` : ''}
                  </div>
                  <div class="right">${safe(p.year)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `
          : ''
      }

      <!-- Languages -->
      <div class="section">
        <div class="h2">Languages</div>
        ${
          (resume.languages && resume.languages.length)
            ? `<div class="muted">${resume.languages
                .map((l) => joinDot(safe(l.name), safe(l.level)))
                .filter(Boolean)
                .join(' · ')}</div>`
            : `<div class="muted">Non renseigné</div>`
        }
      </div>

      <!-- Publications -->
      ${
        (resume.publications && resume.publications.length)
          ? `
          <div class="section">
            <div class="h2">Publications</div>
            ${resume.publications.map((pub) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="org">${safe(pub.title)}</div>
                    <div class="muted">${joinDot(safe(pub.type), safe(pub.url))}</div>
                  </div>
                  <div class="right">${safe(pub.year)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `
          : ''
      }

      <!-- Communications -->
      ${
        (resume.communications && resume.communications.length)
          ? `
          <div class="section">
            <div class="h2">Communications</div>
            ${resume.communications.map((com) => `
              <div class="block">
                <div class="row">
                  <div class="left">
                    <div class="org">${safe(com.title)}</div>
                    <div class="muted">${safe(com.url)}</div>
                  </div>
                  <div class="right">${safe(com.year)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `
          : ''
      }

      <!-- Additional info -->
      <div class="section">
        <div class="h2">Additional Information</div>
        <div class="muted">
          ${joinDot(
            resume.extras?.handicap ? `Handicap: ${safe(resume.extras.handicap)}` : '',
            `Fonctionnaire: ${resume.extras?.fonctionnaire ? 'Oui' : 'Non'}`,
            resume.contact?.cin ? `CIN: ${safe(resume.contact.cin)}` : '',
          )}
        </div>
      </div>

    </body>
  </html>
  `;
}

  async buildResumePdf(user) {
    const resume = await this.buildResumeTemplate(user);
    const html = this.buildResumeHtml(resume);

    try {
      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
      });
      await browser.close();
      return pdfBuffer;
    } catch (error) {
      if (error?.status) {
        throw error;
      }
      Logger.error(
        `PDF generation failed: ${error?.message}`,
        error?.stack,
        'CandidatureService',
      );
      throw new InternalServerErrorException(
        error?.message || 'Impossible de générer le CV PDF.',
      );
    }
  }
}
