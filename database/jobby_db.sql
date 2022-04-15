-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2022 at 10:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobby_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `apply`
--

CREATE TABLE `apply` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_job` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cv_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apply`
--

INSERT INTO `apply` (`id`, `id_job`, `id_candidate`, `id_company`, `created_at`, `updated_at`, `full_name`, `email`, `cv_image`) VALUES
(0, 0, 0, 0, '2022-04-08', '2022-04-08', 'Anonymous', 'Anonymous', 'Anonymous');

-- --------------------------------------------------------

--
-- Table structure for table `bid`
--

CREATE TABLE `bid` (
  `id` int(10) UNSIGNED NOT NULL,
  `min_rate` int(11) NOT NULL DEFAULT 0,
  `delivery_time` date DEFAULT NULL,
  `id_project` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bid`
--

INSERT INTO `bid` (`id`, `min_rate`, `delivery_time`, `id_project`, `id_candidate`, `id_company`, `status`, `created_at`, `updated_at`) VALUES
(0, 0, '2022-04-08', 0, 0, 0, '', '2022-04-08', '2022-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `description1` text NOT NULL,
  `message` varchar(255) NOT NULL,
  `description2` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `image`, `id_candidate`, `id_company`, `title`, `description1`, `message`, `description2`, `created_at`, `updated_at`) VALUES
(0, '', 0, 0, '', '', '', '', '2022-04-08', '2022-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `bookmark`
--

CREATE TABLE `bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_job` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_project` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `by_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `by_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookmark`
--

INSERT INTO `bookmark` (`id`, `id_job`, `id_project`, `id_company`, `id_candidate`, `by_candidate`, `by_company`, `created_at`, `updated_at`) VALUES
(0, 0, 0, 0, 0, 0, 0, '2022-04-08', '2022-04-08'),
(2, 4, 0, 0, 0, 2, 0, '2022-04-14', '2022-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `experience_level` varchar(255) DEFAULT NULL,
  `pay_rate` int(11) DEFAULT 0,
  `languages` varchar(255) DEFAULT NULL,
  `id_location` int(10) UNSIGNED DEFAULT 0,
  `rating` double(2,1) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `image`, `first_name`, `last_name`, `email`, `password`, `description`, `tagline`, `skills`, `availability`, `experience_level`, `pay_rate`, `languages`, `id_location`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(0, NULL, NULL, NULL, 'anonymous', 'anonymous', NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'deactived', '2022-04-08', '2022-04-08'),
(2, 'johndoe.jpg', 'John', 'Doe', 'johndoe@gmail.com', '$2a$05$s6NgvPG3tAq8wTKpkuR85evrbdc4SNKHdhAUv17uGlU2uSIW30.GK', 'My name is John Doe, I am a UX Designer', 'UX Designer', 'UX, UI, Photoshop,  Designer, HTML, CSS, Javascript', 'Full Time', 'Entry-level (1 year - 3 year)', 50, 'English', 0, 0.0, 'active', '2022-04-13', '2022-04-13'),
(3, 'johnsonsmith.png', 'Johnson', 'Smith', 'johnsonsmith@gmail.com', '$2a$05$kORz50mOIdLqexsP3Ato3uaDmPkijjTsWZ6U.lOaqhpIyzWznd5T.', 'Hi, My name\'s Johnson Smith', 'PHP Developer', 'Php, Mysql, Javascript, HTML, CSS, Lavarel', 'Part Time', 'Mid-level (5 year - 7 year)', 90, 'India', 0, 0.0, 'active', '2022-04-13', '2022-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `jobs` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `jobs`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Web & Mobile & Software Dev', 150, 'folder', '2022-04-15', '2022-04-15'),
(2, 'Data Science & Analytics', 120, 'barcode', '2022-04-15', '2022-04-15'),
(3, 'Admin Support', 290, 'gears', '2022-04-15', '2022-04-15'),
(4, 'Design & Creative', 250, 'pen', '2022-04-15', '2022-04-15'),
(5, 'Accounting & Consulting', 350, 'receipt', '2022-04-15', '2022-04-15'),
(6, 'Writing', 90, 'keyboard', '2022-04-15', '2022-04-15'),
(7, 'Legal', 250, 'file-contract', '2022-04-15', '2022-04-15'),
(8, 'IT & Networking', 150, 'globe', '2022-04-15', '2022-04-15'),
(9, 'Sales & Marketing', 110, 'ranking-star', '2022-04-15', '2022-04-15'),
(10, 'Customer Service', 310, 'people-group', '2022-04-15', '2022-04-15'),
(11, 'Translation', 410, 'language', '2022-04-15', '2022-04-15'),
(12, 'Engineering & Architecture', 190, 'hospital-user', '2022-04-15', '2022-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_blog` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `content` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `experience_level` varchar(255) DEFAULT NULL,
  `pay_rate` int(11) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `id_location` int(10) UNSIGNED DEFAULT NULL,
  `rating` double(2,1) NOT NULL DEFAULT 0.0,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `image`, `name`, `email`, `password`, `description`, `tagline`, `skills`, `availability`, `experience_level`, `pay_rate`, `languages`, `id_location`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(0, NULL, NULL, 'anonymous', 'anonymous', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.0, 'deactived', '2022-04-08', '2022-04-08'),
(2, 'envato.jpg', 'Envato', 'envato@gmail.com', 'envato', 'Company\'s Name: Envato', 'Wordpress Developer', 'HTML, CSS, Wordpress, Javascript, Jquery', 'Full Time', 'Senior or executive-level (> 7 year)', 120, 'Australia', NULL, 0.0, 'active', '2022-04-14', '2022-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `type` varchar(2) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `id_candidate`, `id_company`, `type`, `url`, `created_at`, `updated_at`) VALUES
(0, 0, 0, '0', '0', '2022-04-08', '2022-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(10) UNSIGNED NOT NULL,
  `register_member` int(11) NOT NULL,
  `jobs_found` int(11) NOT NULL,
  `best_companies` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `register_member`, `jobs_found`, `best_companies`, `created_at`, `updated_at`) VALUES
(1, 4000000, 768986, 1234, '2022-04-13', '2022-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `type`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'offer', 'Searching the Best Jobs', 'Here, you can find the best and most suitable jobs for you in all industries', '2022-04-14', '2022-04-14'),
(2, 'offer', 'Apply For A Good Job', 'You can apply for the best jobs that are relevant to your major', '2022-04-14', '2022-04-14'),
(3, 'offer', 'More Quality Hires', 'Quality recruitment team suitable for many industries and experience levels', '2022-04-14', '2022-04-14'),
(4, 'offer', 'Choose Your Working Hours', 'Choose your working hours to optimize your time', '2022-04-14', '2022-04-14'),
(5, 'post job', 'Hire for your company.', 'You can find the right candidate for your company from many parts of the world. There are many candidates with different levels of experience', '2022-04-15', '2022-04-15'),
(6, 'post job', 'Daily out reach to qualified matches.', 'With more than 3 million applicants, job search will be easier and employers will also find the right candidate faster.', '2022-04-15', '2022-04-15'),
(7, 'talented candidates', 'Get your profile listed', 'The list of candidates who apply for jobs, hire projects or bookmarks will be listed in full. Management will be easier.', '2022-04-15', '2022-04-15'),
(8, 'talented candidates', 'Customize your profile.', 'Change your profile information and update your resume easily to optimize your look in the eyes of recruiters.', '2022-04-15', '2022-04-15'),
(9, 'introduce', '', ' You\'re here to hire. We\'re here to help.', '2022-04-15', '2022-04-15'),
(11, 'introduce', '', 'Post a job in minutes and start receiving qualified resumes as soon as today.', '2022-04-15', '2022-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(1) UNSIGNED NOT NULL,
  `customer` varchar(255) NOT NULL,
  `supplier` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  `hourly` int(11) NOT NULL DEFAULT 0,
  `experience_level` varchar(255) NOT NULL,
  `salary_min` bigint(20) NOT NULL,
  `salary_max` bigint(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `languages` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `views` int(10) NOT NULL DEFAULT 0,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT '''""''',
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `expired_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `name`, `description`, `type`, `category`, `availability`, `hourly`, `experience_level`, `salary_min`, `salary_max`, `location`, `languages`, `skills`, `file`, `views`, `id_candidate`, `id_company`, `status`, `created_at`, `updated_at`, `expired_at`) VALUES
(0, '', '', '', '', '', 0, '', 0, 0, '', '', '', '', 0, 0, 0, '\'\"\"\'', '0000-00-00', '0000-00-00', '0000-00-00'),
(3, 'UX Designer', 'A UX Designer, or User Experience Designer, is responsible for monitoring user experience and ensuring that websites, software programs and products are easy to use. Their duties include reviewing user feedback to determine potential defects or areas for clarity, working closely with other IT professionals and company personnel to refine user experience and performing usability tests on software products or website features to ensure functionality.', 'UX Designer', 'Design & Creative', 'Full Time', 0, 'Intermediate (3 year - 5 year)', 444, 5000, 'California', 'English', 'UI, UX, Photoshop, Designer, HTML, CSS, Jquery', 'requirements.pdf', 0, 2, 0, 'Expiring', '2022-04-14', '2022-04-15', '2022-04-13'),
(4, 'PHP Developer', 'PHP developers write server-side web applications using Hypertext Preprocessor (PHP) scripting languages. They are tasked with developing and coding back-end components and connecting applications to other web services. PHP developers also assist front-end developers to ensure their work integrates into the application.', '', 'Web & Mobile Software Dev', 'Full Time', 1, 'Intermediate (3 year - 5 year)', 44, 5000, 'India', 'India', 'Php, Sql, Javascript, HTML, css, jquery', '', 0, 3, 0, '\'\"\"\'', '2022-04-14', '2022-04-14', '2022-05-14'),
(5, 'Wordpress Developer', 'WordPress developers design and implement websites for companies using the WordPress creation tool. They are responsible for both front-end and back-end development, including the implementation of themes and plugins. Their goal is to create attractive and user-friendly websites according to client specifications.', 'Wordpress Developer', 'Web & Mobile Software Dev', 'Part Time', 0, 'Mid-level (5 year - 7 year)', 900, 5000, 'Australia', 'Australia', 'Html, css, javascript, jquery, wordpress', '', 0, 0, 2, '\'\"\"\'', '2022-04-14', '2022-04-14', '2022-05-14'),
(6, 'UX Designer', 'Conducting user research and testing\r\nDeveloping wireframes and task flows based on user needs\r\nCollaborating with Designers and Developers to create intuitive, user-friendly software', 'Developer', 'Design & Creative', 'Full Time', 1, 'Mid level(5 year - 7year)', 80, 5000, 'New York City', 'English', 'UX, UI, Photoshop', '', 0, 2, 0, '', '2022-04-14', '2022-04-14', '2022-05-14'),
(7, 'Front End Developer', 'Determining the structure and design of web pages.\nEnsuring user experience determines design choices.\nDeveloping features to enhance the user experience.\nStriking a balance between functional and aesthetic design.\nEnsuring web design is optimized for smartphones.\nBuilding reusable code for future use.\nOptimizing web pages for maximum speed and scalability.\nUtilizing a variety of markup languages to write web pages.\nMaintaining brand consistency throughout the design.', 'Front End Development', 'Web & Mobile Software Dev', 'Part Time', 0, 'Entry level(1 year - 3year)', 200, 5000, 'Viet Nam', 'English', 'HTML, CSS, Javascript, Jquery, React, Responsive', 'required.docx', 0, 2, 0, '\'\"\"\'', '2022-04-15', '2022-04-15', '2022-05-15'),
(8, 'Nodejs Developer', 'Determining the structure and design of web pages.\nEnsuring user experience determines design choices.\nDeveloping features to enhance the user experience.\nStriking a balance between functional and aesthetic design.\nEnsuring web design is optimized for smartphones.\nBuilding reusable code for future use.\nOptimizing web pages for maximum speed and scalability.\nUtilizing a variety of markup languages to write web pages.\nMaintaining brand consistency throughout the design.', 'Backend Development', 'Web & Mobile Software Dev', 'Full Time', 1, 'Intern (<1year)', 33, 5000, 'Japan', 'Japan', 'HTML, CSS, Javascript, Sql, Nodejs, Express', 'required.pdf', 0, 0, 2, '\'\"\"\'', '2022-04-15', '2022-04-15', '2022-05-15');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(10) UNSIGNED NOT NULL,
  `src` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `src`, `created_at`, `updated_at`, `name`) VALUES
(0, '\"\"', '2022-04-08', '2022-04-08', '\"\"');

-- --------------------------------------------------------

--
-- Table structure for table `open_ticket`
--

CREATE TABLE `open_ticket` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pricing_plan`
--

CREATE TABLE `pricing_plan` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `listing` int(11) NOT NULL,
  `visibility` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `experience_level` varchar(255) NOT NULL,
  `budget` varchar(255) NOT NULL,
  `hourly` int(11) NOT NULL DEFAULT 0,
  `salary_min` bigint(20) NOT NULL,
  `salary_max` bigint(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_candidate` int(10) UNSIGNED NOT NULL,
  `id_company` int(10) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `expired_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `category`, `experience_level`, `budget`, `hourly`, `salary_min`, `salary_max`, `location`, `skills`, `image`, `id_candidate`, `id_company`, `status`, `created_at`, `updated_at`, `expired_at`) VALUES
(0, 'anonymous', 'anonymous', 'anonymous', 'anonymous', 'anonymous', 0, 0, 0, 'anonymous', 'anonymous', 'anonymous', 0, 0, 'anonymous', '2022-04-08', '2022-04-08', '2022-05-08');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '''''',
  `jobs` int(11) NOT NULL DEFAULT 0,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `image`, `name`, `jobs`, `created_at`, `updated_at`) VALUES
(1, 'California-State-Capitol-in-Sacramento.jpg', 'California', 125, '2022-04-13', '2022-04-13'),
(2, 'LosAngeles.jpg', 'Los Angeles ', 25, '2022-04-13', '2022-04-13'),
(3, 'SanFrancisco.jpg', 'SanFrancisco', 12, '2022-04-13', '2022-04-13'),
(4, 'Tulsa.jpg', 'Tulsa', 190, '2022-04-13', '2022-04-13'),
(5, 'Austin.jpg', 'Austin', 200, '2022-04-13', '2022-04-13');

-- --------------------------------------------------------

--
-- Table structure for table `statement`
--

CREATE TABLE `statement` (
  `id` int(1) UNSIGNED NOT NULL,
  `pricing_name` varchar(255) NOT NULL,
  `invoice_id` int(1) UNSIGNED NOT NULL DEFAULT 0,
  `type` varchar(2) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apply`
--
ALTER TABLE `apply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_apply` (`id_candidate`),
  ADD KEY `pk_company_apply` (`id_company`),
  ADD KEY `pk_job_apply` (`id_job`);

--
-- Indexes for table `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_bid` (`id_candidate`),
  ADD KEY `pk_company_bid` (`id_company`),
  ADD KEY `pk_project_bid` (`id_project`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_blog` (`id_candidate`),
  ADD KEY `pk_company_blog` (`id_company`);

--
-- Indexes for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_bookmark` (`id_candidate`),
  ADD KEY `pk_company_bookmark` (`id_company`),
  ADD KEY `pk_job_bookmark` (`id_job`),
  ADD KEY `pk_project_bookmark` (`id_project`),
  ADD KEY `pk_candiate_bookmark_by` (`by_candidate`),
  ADD KEY `pk_company_bookmark_by` (`by_company`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_location_candidate` (`id_location`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_comment` (`id_candidate`),
  ADD KEY `pk_company_comment` (`id_company`),
  ADD KEY `pk_blog_comment` (`id_blog`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_location_company` (`id_location`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_contact` (`id_candidate`),
  ADD KEY `pk_company_contact` (`id_company`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_job` (`id_candidate`),
  ADD KEY `pk_company_job` (`id_company`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `open_ticket`
--
ALTER TABLE `open_ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pricing_plan`
--
ALTER TABLE `pricing_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_project` (`id_candidate`),
  ADD KEY `pk_company_project` (`id_company`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statement`
--
ALTER TABLE `statement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_invoice_statement` (`invoice_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apply`
--
ALTER TABLE `apply`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bid`
--
ALTER TABLE `bid`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookmark`
--
ALTER TABLE `bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(1) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `open_ticket`
--
ALTER TABLE `open_ticket`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pricing_plan`
--
ALTER TABLE `pricing_plan`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `statement`
--
ALTER TABLE `statement`
  MODIFY `id` int(1) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `apply`
--
ALTER TABLE `apply`
  ADD CONSTRAINT `pk_candidate_apply` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_apply` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_job_apply` FOREIGN KEY (`id_job`) REFERENCES `job` (`id`);

--
-- Constraints for table `bid`
--
ALTER TABLE `bid`
  ADD CONSTRAINT `pk_candidate_bid` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_bid` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_project_bid` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`);

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `pk_candidate_blog` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_blog` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`);

--
-- Constraints for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD CONSTRAINT `pk_candiate_bookmark_by` FOREIGN KEY (`by_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_candidate_bookmark` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_bookmark` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_company_bookmark_by` FOREIGN KEY (`by_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_job_bookmark` FOREIGN KEY (`id_job`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `pk_project_bookmark` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`);

--
-- Constraints for table `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `pk_location_candidate` FOREIGN KEY (`id_location`) REFERENCES `location` (`id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `pk_blog_comment` FOREIGN KEY (`id_blog`) REFERENCES `blog` (`id`),
  ADD CONSTRAINT `pk_candidate_comment` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_comment` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`);

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `pk_location_company` FOREIGN KEY (`id_location`) REFERENCES `location` (`id`);

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `pk_candidate_contact` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_contact` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`);

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `pk_candidate_job` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_job` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `pk_candidate_project` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_project` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`);

--
-- Constraints for table `statement`
--
ALTER TABLE `statement`
  ADD CONSTRAINT `pk_invoice_statement` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
