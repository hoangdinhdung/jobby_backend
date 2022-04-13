-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2022 at 12:19 PM
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
-- Table structure for table `bookmark`
--

CREATE TABLE `bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_job` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_project` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `by_candiate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `by_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookmark`
--

INSERT INTO `bookmark` (`id`, `id_job`, `id_project`, `id_company`, `id_candidate`, `by_candiate`, `by_company`, `created_at`, `updated_at`) VALUES
(0, 0, 0, 0, 0, 0, 0, '2022-04-08', '2022-04-08');

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
  `location_id` int(10) UNSIGNED DEFAULT 0,
  `rating` double(2,1) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `image`, `first_name`, `last_name`, `email`, `password`, `description`, `tagline`, `skills`, `availability`, `experience_level`, `pay_rate`, `languages`, `location_id`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(0, NULL, NULL, NULL, 'anonymous', 'anonymous', NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'deactived', '2022-04-08', '2022-04-08');

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
  `location_id` int(10) UNSIGNED DEFAULT NULL,
  `rating` double(2,1) NOT NULL DEFAULT 0.0,
  `status` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `image`, `name`, `email`, `password`, `description`, `tagline`, `skills`, `availability`, `experience_level`, `pay_rate`, `languages`, `location_id`, `rating`, `status`, `created_at`, `updated_at`) VALUES
(0, NULL, NULL, 'anonymous', 'anonymous', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.0, 'deactived', '2022-04-08', '2022-04-08');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_candidate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `id_company` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `type` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `url` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `id_candidate`, `id_company`, `type`, `url`, `created_at`, `updated_at`) VALUES
(0, 0, 0, 0, '0', '2022-04-08', '2022-04-08');

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

INSERT INTO `job` (`id`, `name`, `description`, `type`, `category`, `availability`, `hourly`, `experience_level`, `salary_min`, `salary_max`, `location`, `languages`, `skills`, `views`, `id_candidate`, `id_company`, `status`, `created_at`, `updated_at`, `expired_at`) VALUES
(0, '', '', '', '', '', 0, '', 0, 0, '', '', '', 0, 0, 0, '\'\"\"\'', '0000-00-00', '0000-00-00', '0000-00-00');

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
  `name` varchar(255) NOT NULL DEFAULT '''''',
  `jobs` int(11) NOT NULL DEFAULT 0,
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
-- Indexes for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_bookmark` (`id_candidate`),
  ADD KEY `pk_company_bookmark` (`id_company`),
  ADD KEY `pk_job_bookmark` (`id_job`),
  ADD KEY `pk_project_bookmark` (`id_project`),
  ADD KEY `pk_candiate_bookmark_by` (`by_candiate`),
  ADD KEY `pk_company_bookmark_by` (`by_company`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_location_candidate` (`location_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_location_company` (`location_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pk_candidate_contact` (`id_candidate`),
  ADD KEY `pk_company_contact` (`id_company`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
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
-- AUTO_INCREMENT for table `bookmark`
--
ALTER TABLE `bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD CONSTRAINT `pk_candiate_bookmark_by` FOREIGN KEY (`by_candiate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_candidate_bookmark` FOREIGN KEY (`id_candidate`) REFERENCES `candidate` (`id`),
  ADD CONSTRAINT `pk_company_bookmark` FOREIGN KEY (`id_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_company_bookmark_by` FOREIGN KEY (`by_company`) REFERENCES `company` (`id`),
  ADD CONSTRAINT `pk_job_bookmark` FOREIGN KEY (`id_job`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `pk_project_bookmark` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`);

--
-- Constraints for table `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `pk_location_candidate` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `pk_location_company` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
